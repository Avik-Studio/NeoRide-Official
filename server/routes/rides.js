const express = require('express');
const Ride = require('../models/ride');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Calculate fare based on distance and ride type
const calculateFare = (distance, rideType) => {
  const baseFare = 50; // Base fare in INR
  const ratePerKm = {
    economy: 12,
    comfort: 18,
    luxury: 35
  };

  return Math.round(baseFare + (distance * ratePerKm[rideType]));
};

// Book a ride
router.post('/book', auth, async (req, res) => {
  try {
    const {
      pickupLocation,
      destination,
      rideType,
      distance,
      duration,
      scheduledTime
    } = req.body;

    // Calculate fare
    const estimatedFare = calculateFare(distance, rideType);

    // Create ride
    const ride = new Ride({
      customer: req.userId,
      pickupLocation,
      destination,
      rideType,
      distance,
      duration,
      estimatedFare,
      scheduledTime: scheduledTime || new Date()
    });

    await ride.save();
    await ride.populate('customer', 'name email phone');

    res.status(201).json({
      message: 'Ride booked successfully',
      ride
    });
  } catch (error) {
    console.error('Ride booking error:', error);
    res.status(500).json({ message: 'Failed to book ride', error: error.message });
  }
});

// Get user's rides
router.get('/my-rides', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = { customer: req.userId };
    
    if (status) {
      query.status = status;
    }

    const rides = await Ride.find(query)
      .populate('driver', 'name phone driverDetails.rating')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Ride.countDocuments(query);

    res.json({
      rides,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get rides error:', error);
    res.status(500).json({ message: 'Failed to get rides' });
  }
});

// Get available drivers near pickup location
router.post('/find-drivers', auth, async (req, res) => {
  try {
    const { pickupLocation, rideType } = req.body;
    const { lat, lng } = pickupLocation.coordinates;

    // Find available drivers within 10km radius
    const drivers = await User.find({
      role: 'driver',
      'driverDetails.isVerified': true,
      isActive: true
    }).limit(5);

    // For demo purposes, return mock nearby drivers
    const nearbyDrivers = drivers.map(driver => ({
      ...driver.toJSON(),
      distance: Math.random() * 5 + 1, // 1-6 km away
      eta: Math.floor(Math.random() * 10) + 3 // 3-13 minutes
    }));

    res.json({ drivers: nearbyDrivers });
  } catch (error) {
    console.error('Find drivers error:', error);
    res.status(500).json({ message: 'Failed to find drivers' });
  }
});

// Cancel ride
router.patch('/:rideId/cancel', auth, async (req, res) => {
  try {
    const ride = await Ride.findOne({
      _id: req.params.rideId,
      customer: req.userId
    });

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (ride.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel completed ride' });
    }

    ride.status = 'cancelled';
    await ride.save();

    res.json({ message: 'Ride cancelled successfully', ride });
  } catch (error) {
    console.error('Cancel ride error:', error);
    res.status(500).json({ message: 'Failed to cancel ride' });
  }
});

// Rate ride
router.patch('/:rideId/rate', auth, async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    
    const ride = await Ride.findOne({
      _id: req.params.rideId,
      customer: req.userId,
      status: 'completed'
    });

    if (!ride) {
      return res.status(404).json({ message: 'Completed ride not found' });
    }

    ride.rating.customer = rating;
    ride.feedback.customer = feedback;
    await ride.save();

    res.json({ message: 'Rating submitted successfully', ride });
  } catch (error) {
    console.error('Rate ride error:', error);
    res.status(500).json({ message: 'Failed to submit rating' });
  }
});

module.exports = router;
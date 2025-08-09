const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Update user profile
router.patch('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['name', 'phone', 'avatar'];
    const filteredUpdates = {};

    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.userId,
      filteredUpdates,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let stats = {};

    if (user.role === 'customer') {
      const Ride = require('../models/ride');
      const totalRides = await Ride.countDocuments({ customer: req.userId });
      const completedRides = await Ride.countDocuments({ 
        customer: req.userId, 
        status: 'completed' 
      });

      stats = {
        totalRides,
        completedRides,
        totalBookings: user.customerDetails.totalBookings || 0,
        memberSince: user.createdAt.getFullYear()
      };
    } else if (user.role === 'driver') {
      stats = {
        totalRides: user.driverDetails.totalRides || 0,
        rating: user.driverDetails.rating || 0,
        isVerified: user.driverDetails.isVerified || false,
        memberSince: user.createdAt.getFullYear()
      };
    }

    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Failed to get user stats' });
  }
});

module.exports = router;
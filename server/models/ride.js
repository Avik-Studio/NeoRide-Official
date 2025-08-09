const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pickupLocation: {
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  destination: {
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  rideType: {
    type: String,
    enum: ['economy', 'comfort', 'luxury'],
    required: true
  },
  distance: {
    type: Number, // in kilometers
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  estimatedFare: {
    type: Number,
    required: true
  },
  actualFare: {
    type: Number
  },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'driver_assigned', 'in_progress', 'completed', 'cancelled'],
    default: 'requested'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'wallet'],
    default: 'cash'
  },
  rating: {
    customer: { type: Number, min: 1, max: 5 },
    driver: { type: Number, min: 1, max: 5 }
  },
  feedback: {
    customer: String,
    driver: String
  },
  scheduledTime: Date,
  startTime: Date,
  endTime: Date,
  route: [{
    lat: Number,
    lng: Number
  }]
}, {
  timestamps: true
});

// Index for geospatial queries
rideSchema.index({ 'pickupLocation.coordinates': '2dsphere' });
rideSchema.index({ 'destination.coordinates': '2dsphere' });

module.exports = mongoose.model('Ride', rideSchema);
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  images: [{
    url: String,
    alt: String
  }],
  features: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String]
  }],
  inclusions: [String],
  exclusions: [String],
  tiers: {
    standard: {
      price: Number,
      features: [String]
    },
    medium: {
      price: Number,
      features: [String]
    },
    luxury: {
      price: Number,
      features: [String]
    }
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxGroupSize: {
    type: Number,
    default: 10
  },
  minAge: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'challenging'],
    default: 'easy'
  },
  bestTime: [String], // Months when package is best
  location: {
    state: String,
    country: { type: String, default: 'India' },
    coordinates: {
      lat: Number,
      lng: Number
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);
import mongoose, { Document, Schema } from 'mongoose';

// Driver Interface
export interface IDriver extends Document {
  supabaseId: string;
  email: string;
  fullName: string;
  phone: string;
  licenseNumber: string;
  vehicleModel: string;
  vehiclePlate: string;
  profileImageUrl?: string;
  vehicleImageUrl?: string;
  status: 'pending' | 'approved' | 'suspended' | 'rejected';
  isAvailable: boolean;
  isOnline: boolean;
  rating: number;
  totalRides: number;
  totalEarnings: number;
  documents: {
    licenseImage?: string;
    vehicleRegistration?: string;
    insurance?: string;
    backgroundCheck?: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    color: string;
    plateNumber: string;
    type: 'sedan' | 'suv' | 'hatchback' | 'luxury' | 'economy';
    capacity: number;
  };
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
    address?: string;
    lastUpdated?: Date;
  };
  workingHours: {
    monday: { start: string; end: string; isWorking: boolean };
    tuesday: { start: string; end: string; isWorking: boolean };
    wednesday: { start: string; end: string; isWorking: boolean };
    thursday: { start: string; end: string; isWorking: boolean };
    friday: { start: string; end: string; isWorking: boolean };
    saturday: { start: string; end: string; isWorking: boolean };
    sunday: { start: string; end: string; isWorking: boolean };
  };
  bankDetails: {
    accountNumber?: string;
    routingNumber?: string;
    bankName?: string;
    accountHolderName?: string;
  };
  rideHistory: Array<{
    rideId: string;
    customerId: string;
    date: Date;
    earnings: number;
    rating?: number;
    feedback?: string;
  }>;
  reviews: Array<{
    customerId: string;
    rating: number;
    comment: string;
    date: Date;
  }>;
  emergencyContact: {
    name?: string;
    phone?: string;
    relationship?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Driver Schema
const DriverSchema: Schema = new Schema({
  supabaseId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  vehicleModel: {
    type: String,
    required: true,
    trim: true
  },
  vehiclePlate: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    index: true
  },
  profileImageUrl: {
    type: String,
    default: null
  },
  vehicleImageUrl: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'suspended', 'rejected'],
    default: 'pending',
    index: true
  },
  isAvailable: {
    type: Boolean,
    default: false,
    index: true
  },
  isOnline: {
    type: Boolean,
    default: false,
    index: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRides: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  documents: {
    licenseImage: String,
    vehicleRegistration: String,
    insurance: String,
    backgroundCheck: String
  },
  vehicle: {
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true,
      min: 2000,
      max: new Date().getFullYear() + 1
    },
    color: {
      type: String,
      required: true
    },
    plateNumber: {
      type: String,
      required: true,
      uppercase: true
    },
    type: {
      type: String,
      enum: ['sedan', 'suv', 'hatchback', 'luxury', 'economy'],
      default: 'sedan'
    },
    capacity: {
      type: Number,
      default: 4,
      min: 1,
      max: 8
    }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
      index: '2dsphere'
    },
    address: String,
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  workingHours: {
    monday: {
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' },
      isWorking: { type: Boolean, default: true }
    },
    tuesday: {
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' },
      isWorking: { type: Boolean, default: true }
    },
    wednesday: {
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' },
      isWorking: { type: Boolean, default: true }
    },
    thursday: {
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' },
      isWorking: { type: Boolean, default: true }
    },
    friday: {
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' },
      isWorking: { type: Boolean, default: true }
    },
    saturday: {
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' },
      isWorking: { type: Boolean, default: false }
    },
    sunday: {
      start: { type: String, default: '09:00' },
      end: { type: String, default: '17:00' },
      isWorking: { type: Boolean, default: false }
    }
  },
  bankDetails: {
    accountNumber: String,
    routingNumber: String,
    bankName: String,
    accountHolderName: String
  },
  rideHistory: [{
    rideId: {
      type: String,
      required: true
    },
    customerId: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    earnings: {
      type: Number,
      required: true,
      min: 0
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String
  }],
  reviews: [{
    customerId: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  }
}, {
  timestamps: true,
  collection: 'drivers'
});

// Indexes for better performance
DriverSchema.index({ email: 1 });
DriverSchema.index({ supabaseId: 1 });
DriverSchema.index({ licenseNumber: 1 });
DriverSchema.index({ vehiclePlate: 1 });
DriverSchema.index({ status: 1 });
DriverSchema.index({ isAvailable: 1 });
DriverSchema.index({ isOnline: 1 });
DriverSchema.index({ location: '2dsphere' });
DriverSchema.index({ rating: -1 });
DriverSchema.index({ createdAt: -1 });

// Pre-save middleware
DriverSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  if (this.isModified('vehiclePlate')) {
    this.vehiclePlate = this.vehiclePlate.toUpperCase();
  }
  if (this.isModified('vehicle.plateNumber')) {
    this.vehicle.plateNumber = this.vehicle.plateNumber.toUpperCase();
  }
  next();
});

// Instance methods
DriverSchema.methods.addRide = function(rideData: any) {
  this.rideHistory.push(rideData);
  this.totalRides = this.rideHistory.length;
  this.totalEarnings += rideData.earnings;
  return this.save();
};

DriverSchema.methods.updateRating = function() {
  const ratings = this.reviews.map((review: any) => review.rating);
  if (ratings.length > 0) {
    this.rating = ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length;
  }
  return this.save();
};

DriverSchema.methods.updateLocation = function(coordinates: [number, number], address?: string) {
  this.location.coordinates = coordinates;
  if (address) this.location.address = address;
  this.location.lastUpdated = new Date();
  return this.save();
};

DriverSchema.methods.setAvailability = function(isAvailable: boolean) {
  this.isAvailable = isAvailable;
  if (!isAvailable) this.isOnline = false;
  return this.save();
};

// Static methods
DriverSchema.statics.findBySupabaseId = function(supabaseId: string) {
  return this.findOne({ supabaseId });
};

DriverSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

DriverSchema.statics.findAvailableDrivers = function(coordinates: [number, number], maxDistance: number = 5000) {
  return this.find({
    status: 'approved',
    isAvailable: true,
    isOnline: true,
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coordinates
        },
        $maxDistance: maxDistance
      }
    }
  });
};

// Export the model
export default mongoose.models.Driver || mongoose.model<IDriver>('Driver', DriverSchema);
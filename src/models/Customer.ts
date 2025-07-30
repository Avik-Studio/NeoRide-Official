import mongoose, { Document, Schema } from 'mongoose';

// Customer Interface
export interface ICustomer extends Document {
  supabaseId: string;
  email: string;
  fullName: string;
  phone: string;
  profileImageUrl?: string;
  isVerified: boolean;
  isActive: boolean;
  preferences: {
    notifications: boolean;
    smsAlerts: boolean;
    emailUpdates: boolean;
  };
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  paymentMethods: Array<{
    type: 'card' | 'wallet' | 'cash';
    isDefault: boolean;
    details?: any;
  }>;
  rideHistory: Array<{
    rideId: string;
    date: Date;
    rating?: number;
    feedback?: string;
  }>;
  totalRides: number;
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
}

// Customer Schema
const CustomerSchema: Schema = new Schema({
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
  profileImageUrl: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    smsAlerts: {
      type: Boolean,
      default: true
    },
    emailUpdates: {
      type: Boolean,
      default: true
    }
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethods: [{
    type: {
      type: String,
      enum: ['card', 'wallet', 'cash'],
      required: true
    },
    isDefault: {
      type: Boolean,
      default: false
    },
    details: Schema.Types.Mixed
  }],
  rideHistory: [{
    rideId: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String
  }],
  totalRides: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true,
  collection: 'customers'
});

// Indexes for better performance
CustomerSchema.index({ email: 1 });
CustomerSchema.index({ supabaseId: 1 });
CustomerSchema.index({ phone: 1 });
CustomerSchema.index({ isActive: 1 });
CustomerSchema.index({ createdAt: -1 });

// Pre-save middleware
CustomerSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// Instance methods
CustomerSchema.methods.addRide = function(rideData: any) {
  this.rideHistory.push(rideData);
  this.totalRides = this.rideHistory.length;
  return this.save();
};

CustomerSchema.methods.updateRating = function() {
  const ratings = this.rideHistory.filter((ride: any) => ride.rating).map((ride: any) => ride.rating);
  if (ratings.length > 0) {
    this.averageRating = ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length;
  }
  return this.save();
};

// Static methods
CustomerSchema.statics.findBySupabaseId = function(supabaseId: string) {
  return this.findOne({ supabaseId });
};

CustomerSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

// Export the model
export default mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);
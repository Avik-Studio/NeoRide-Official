import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CreditCard, Calendar, MapPin, Users, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Package {
  id: string;
  title: string;
  destination: string;
  price: number;
  duration: string;
  image: string;
  rating: number;
  features: string[];
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: Package | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, package: selectedPackage }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    travelers: 1,
    date: '',
    tier: 'medium',
    specialRequests: '',
    paymentScreenshot: null as File | null
  });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tiers = [
    {
      name: 'Standard',
      multiplier: 1,
      perks: ['Basic accommodation', 'Standard transportation', 'Travel insurance', '24/7 support'],
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Medium',
      multiplier: 1.5,
      perks: ['Comfort accommodation', 'Premium transportation', 'Travel insurance', 'Priority support', 'Meal inclusion', 'Local guide'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Luxury',
      multiplier: 2.2,
      perks: ['Luxury accommodation', 'Premium transportation', 'Comprehensive insurance', 'VIP support', 'All meals included', 'Personal guide', 'Spa access', 'Priority booking'],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const selectedTier = tiers.find(t => t.name.toLowerCase() === formData.tier);
  const totalPrice = selectedPackage ? Math.round(selectedPackage.price * selectedTier!.multiplier * formData.travelers) : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      paymentScreenshot: file
    });
  };

  const handlePayment = () => {
    // Initialize Razorpay
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: totalPrice * 100, // Amount in paise
      currency: 'INR',
      name: 'Neoride',
      description: `${selectedPackage?.title} - ${selectedTier?.name} Package`,
      handler: function (response: any) {
        console.log('Payment successful:', response);
        setStep(3); // Move to screenshot upload step
      },
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      theme: {
        color: '#3B82F6'
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically upload the screenshot and create the booking
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form and close modal
      setFormData({
        travelers: 1,
        date: '',
        tier: 'medium',
        specialRequests: '',
        paymentScreenshot: null
      });
      setStep(1);
      onClose();
      
      // Show success message (you could use a toast library here)
      alert('Booking submitted successfully! We will confirm your booking within 24 hours.');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedPackage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Book {selectedPackage.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step > stepNumber ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Package Details */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={selectedPackage.image}
                        alt={selectedPackage.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {selectedPackage.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{selectedPackage.destination}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{selectedPackage.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Number of Travelers
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleInputChange}
                          min="1"
                          max="10"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Travel Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Choose Your Experience Tier
                    </label>
                    <div className="space-y-3">
                      {tiers.map((tier) => (
                        <motion.div
                          key={tier.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, tier: tier.name.toLowerCase() })}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.tier === tier.name.toLowerCase()
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-800 dark:text-white">{tier.name}</h3>
                            <div className="text-lg font-bold text-gray-800 dark:text-white">
                              ₹{Math.round(selectedPackage.price * tier.multiplier)}
                            </div>
                          </div>
                          {formData.tier === tier.name.toLowerCase() && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="space-y-2"
                            >
                              {tier.perks.map((perk, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <Star className="h-3 w-3 text-yellow-500" />
                                  <span className="text-sm text-gray-600 dark:text-gray-300">{perk}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-white resize-none"
                      placeholder="Any special requirements or preferences..."
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-800 dark:text-white">Total Amount:</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ₹{totalPrice}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {formData.travelers} traveler(s) × ₹{Math.round(selectedPackage.price * selectedTier!.multiplier)} ({selectedTier?.name})
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6 text-center"
                >
                  <div className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6">
                    <CreditCard className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Payment Details
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      You will be redirected to Razorpay for secure payment processing
                    </p>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{totalPrice}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handlePayment}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                    >
                      Pay Now
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Upload Payment Screenshot */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <Upload className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Upload Payment Screenshot
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Please upload a screenshot of your successful payment for verification
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Payment Screenshot
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="payment-screenshot"
                        required
                      />
                      <label
                        htmlFor="payment-screenshot"
                        className="w-full flex items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-white/30 dark:bg-gray-800/30"
                      >
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {formData.paymentScreenshot 
                              ? formData.paymentScreenshot.name 
                              : 'Click to upload payment screenshot'
                            }
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      disabled={!formData.paymentScreenshot}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      Confirm Your Booking
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Please review your booking details before submitting
                    </p>
                  </div>

                  <div className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Package:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{selectedPackage.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Destination:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{selectedPackage.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Date:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Travelers:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{formData.travelers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Tier:</span>
                      <span className="font-semibold text-gray-800 dark:text-white capitalize">{formData.tier}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 dark:border-gray-600 pt-4">
                      <span className="text-lg font-semibold text-gray-800 dark:text-white">Total:</span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{totalPrice}</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
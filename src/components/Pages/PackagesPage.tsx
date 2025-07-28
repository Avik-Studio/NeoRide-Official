import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
}

const packages: Package[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    duration: 'month',
    features: [
      'Up to 10 rides per month',
      'Standard vehicle options',
      'Basic customer support',
      'Mobile app access',
      'GPS tracking'
    ],
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-blue-500'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    duration: 'month',
    features: [
      'Up to 50 rides per month',
      'Premium vehicle options',
      'Priority customer support',
      'Mobile app access',
      'GPS tracking',
      'Ride scheduling',
      'Multiple payment methods'
    ],
    popular: true,
    icon: <Star className="w-6 h-6" />,
    color: 'bg-purple-500'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    duration: 'month',
    features: [
      'Unlimited rides',
      'Luxury vehicle options',
      '24/7 premium support',
      'Mobile app access',
      'GPS tracking',
      'Ride scheduling',
      'Multiple payment methods',
      'Corporate billing',
      'Analytics dashboard',
      'Custom branding'
    ],
    icon: <Crown className="w-6 h-6" />,
    color: 'bg-gold-500'
  }
];

const PackagesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the package that best fits your transportation needs. 
            All plans include our core features with varying levels of access and support.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                pkg.popular ? 'ring-2 ring-purple-500 shadow-xl' : 'shadow-lg'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${pkg.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                  {pkg.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {pkg.name}
                </CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold text-gray-900">₹{pkg.price}</span>
                  <span className="text-gray-600">/{pkg.duration}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    pkg.popular 
                      ? 'bg-purple-500 hover:bg-purple-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white font-semibold py-3 rounded-lg transition-colors duration-200`}
                >
                  Choose {pkg.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose NeoRide?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">Quick booking and reliable service with real-time tracking.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Verified drivers and secure payment processing.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for all your needs.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What happens if I exceed my ride limit?</h3>
              <p className="text-gray-600">You can purchase additional rides or upgrade to a higher plan. We'll notify you when you're approaching your limit.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial available?</h3>
              <p className="text-gray-600">Yes, we offer a 7-day free trial for new users to experience our premium features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
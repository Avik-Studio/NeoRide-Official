import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Globe, Shield, Heart, Zap, Compass, CheckCircle, Star, TrendingUp } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide seamless, reliable, and memorable travel experiences that connect people with the world around them.',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Every decision we make is centered around creating the best possible experience for our customers and partners.',
      color: 'bg-green-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from technology to customer support.',
      color: 'bg-purple-500'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting travelers with destinations worldwide through our extensive network of partners.',
      color: 'bg-orange-500'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety and security are our top priorities, with comprehensive insurance and verified partners.',
      color: 'bg-red-500'
    },
    {
      icon: Heart,
      title: 'Passionate Service',
      description: 'We are passionate about travel and committed to making every journey extraordinary.',
      color: 'bg-pink-500'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg',
      bio: 'Former travel industry executive with 15+ years of experience in creating exceptional customer experiences.',
      linkedin: '#'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg',
      bio: 'Technology visionary who has built scalable platforms for millions of users across multiple industries.',
      linkedin: '#'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg',
      bio: 'Operations expert specializing in logistics and supply chain management for global travel networks.',
      linkedin: '#'
    },
    {
      name: 'David Kim',
      role: 'Head of Marketing',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg',
      bio: 'Creative marketing strategist with a passion for storytelling and building meaningful brand connections.',
      linkedin: '#'
    },
    {
      name: 'Lisa Thompson',
      role: 'Customer Success Manager',
      image: 'https://images.pexels.com/photos/3785074/pexels-photo-3785074.jpeg',
      bio: 'Customer advocate dedicated to ensuring every traveler has an amazing experience with Neoride.',
      linkedin: '#'
    },
    {
      name: 'James Wilson',
      role: 'Head of Partnerships',
      image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg',
      bio: 'Partnership specialist building relationships with hotels, airlines, and local service providers worldwide.',
      linkedin: '#'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize travel booking' },
    { year: '2021', title: 'First 1,000 Users', description: 'Reached our first milestone of happy travelers' },
    { year: '2022', title: 'Global Expansion', description: 'Expanded to 50+ destinations worldwide' },
    { year: '2023', title: '50K+ Travelers', description: 'Served over 50,000 satisfied customers' },
    { year: '2024', title: 'AI Integration', description: 'Launched AI-powered travel recommendations' }
  ];

  const achievements = [
    { icon: Star, title: 'Best Travel App 2023', org: 'Travel Tech Awards' },
    { icon: Award, title: 'Customer Choice Award', org: 'TripAdvisor' },
    { icon: TrendingUp, title: 'Fastest Growing Startup', org: 'Tech Crunch' },
    { icon: Shield, title: 'Security Excellence', org: 'Cyber Security Institute' }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Neoride
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Revolutionizing travel experiences through innovation, reliability, and exceptional service
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center space-x-8 text-center"
          >
            {[
              { number: '50K+', label: 'Happy Travelers' },
              { number: '200+', label: 'Destinations' },
              { number: '4.9★', label: 'Average Rating' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl p-4 border border-white/30 dark:border-gray-700/30">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 mb-16"
      >
        <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/30">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2020, Neoride began with a simple vision: to make travel accessible, 
                enjoyable, and stress-free for everyone. What started as a small team with big 
                dreams has grown into a trusted platform serving thousands of travelers worldwide.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We believe that travel has the power to transform lives, create memories, and 
                build connections. That's why we're committed to providing not just transportation 
                and accommodation, but complete travel experiences.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, we continue to innovate and expand our services, always keeping our 
                customers at the heart of everything we do.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">ISO 27001 Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
                alt="Team collaboration"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">4+ Years</div>
                <div className="text-sm opacity-90">of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
          Our Journey
        </h2>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl p-6 border border-white/30 dark:border-gray-700/30">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-900"></div>
                </div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
          Our Values
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30"
            >
              <div className="flex items-start space-x-4">
                <div className={`${value.color} p-3 rounded-lg shadow-lg`}>
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Achievements Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
          Awards & Recognition
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl p-6 border border-white/30 dark:border-gray-700/30 text-center"
            >
              <achievement.icon className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {achievement.org}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
          Meet Our Team
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover shadow-lg"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {member.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {member.bio}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                Connect
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 pb-16"
      >
        <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-8">Neoride by Numbers</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Happy Customers', icon: Users },
              { number: '200+', label: 'Destinations', icon: Globe },
              { number: '1000+', label: 'Successful Trips', icon: Compass },
              { number: '4.9★', label: 'Average Rating', icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-80" />
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full"></div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
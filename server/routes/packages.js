const express = require('express');
const Package = require('../models/Package');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all packages
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, destination, priceRange } = req.query;
    const query = { isActive: true };

    if (destination) {
      query.destination = new RegExp(destination, 'i');
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      query.basePrice = { $gte: min, $lte: max };
    }

    const packages = await Package.find(query)
      .sort({ rating: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Package.countDocuments(query);

    res.json({
      packages,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get packages error:', error);
    res.status(500).json({ message: 'Failed to get packages' });
  }
});

// Get package by ID
router.get('/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json({ package });
  } catch (error) {
    console.error('Get package error:', error);
    res.status(500).json({ message: 'Failed to get package' });
  }
});

// Create package (admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    const User = require('../models/User');
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const package = new Package(req.body);
    await package.save();

    res.status(201).json({
      message: 'Package created successfully',
      package
    });
  } catch (error) {
    console.error('Create package error:', error);
    res.status(500).json({ message: 'Failed to create package' });
  }
});

module.exports = router;
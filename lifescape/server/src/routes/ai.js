const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();

// Proxy to AI service
router.post('/insight', auth, async (req, res) => {
  try {
    const response = await axios.post('http://localhost:8000/insight', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'AI service error', error: err.message });
  }
});

module.exports = router; 
const express = require('express');
const { 
  getBingos,
  getBingo,
  createBingo,
  deleteBingo,
  updateBingo
} = require('../controllers/bingoController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// require auth for all bingo routes
router.use(requireAuth)

// GET all bingos
router.get('/', getBingos)

// GET a single bingo
router.get('/:id', getBingo)

// POST a new bingo
router.post('/', createBingo)

// DELETE a bingo
router.delete('/:id', deleteBingo)

// Update a bingo
router.patch('/:id', updateBingo)

module.exports = router;
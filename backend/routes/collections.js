const express = require('express');
const { 
  getCollections,
  getCollection,
  createCollection,
  deleteCollection,
  updateCollection
} = require('../controllers/collectionController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// require auth for all bingo routes
router.use(requireAuth)

// GET all bingos
router.get('/', getCollections)

// GET a single bingo
router.get('/:id', getCollection)

// POST a new bingo
router.post('/', createCollection)

// DELETE a bingo
router.delete('/:id', deleteCollection)

// Update a bingo
router.patch('/:id', updateCollection)

module.exports = router;
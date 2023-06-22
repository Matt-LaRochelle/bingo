const Collection = require('../models/collectionModel.js')
const mongoose = require('mongoose')

// get all collections
const getCollections = async (req, res) => {
    const user_id = req.user._id

    const collections = await Collection.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(collections)
}

// get a single collection
const getCollection = async (req, res) => {
    const { id } = req.params

    // checks if id is not a valid mongoose string
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such collection.'})
    }

    const collection = await Collection.findById(id)

    if (!collection) {
        return res.status(404).json({error: 'No such collection.'})
    }

    res.status(200).json(collection)
}


// create a new collection
const createCollection = async (req, res) => {
    const {title} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('entry')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields})
    }
    if (title.length > 40) {
        return res.status(400).json({error: 'Title has a max length of 40 characters.' })
    }

    // add doc to db
    try {
      const user_id = req.user._id
      const collection = await Collection.create({title, user_id})
      res.status(200).json(collection)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

// delete a collection
const deleteCollection = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such collection.'})
    }

    const collection = await Collection.findOneAndDelete({_id: id})

    if (!collection) {
        return res.status(400).json({error: "No such collection."})
    }

    res.status(200).json(collection)
}

// update a collection
const updateCollection = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such collection.'})
    }

    const collection = await Collection.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!collection) {
        return res.status(400).json({error: "No such collection."})
    }

    res.status(200).json(collection)
}





module.exports = {
    getCollections,
    getCollection,
    createCollection,
    deleteCollection,
    updateCollection
}
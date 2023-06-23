const Bingo = require('../models/bingoModel.js')
const mongoose = require('mongoose')

// get all bingos
const getBingos = async (req, res) => {
    const user_id = req.user._id

    const bingos = await Bingo.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(bingos)
}

// get a collection of bingos
const getBingo = async (req, res) => {
    const { id: collection_id } = req.params

    console.log(collection_id)
    // checks if id is not a valid mongoose string
    if (!mongoose.Types.ObjectId.isValid(collection_id)) {
        console.log("stopped step 1")
        return res.status(404).json({error: 'No such bingo.'})
    }

    const bingo = await Bingo.find({ collection_id: collection_id }).sort({createdAt: -1})

    if (!bingo) {
        console.log("stopped step 2")
        return res.status(404).json({error: 'No such bingo.'})
    }

    res.status(200).json(bingo)
}


// create a new bingo
const createBingo = async (req, res) => {
    const {entry, collection_id} = req.body

    let emptyFields = []

    if (!entry) {
        emptyFields.push('entry')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields})
    }
    if (entry.length > 65) {
        return res.status(400).json({error: 'Entry has a max length of 65 characters.' })
    }

    // add doc to db
    try {
      const user_id = req.user._id
      const bingo = await Bingo.create({entry, collection_id, user_id})
      res.status(200).json(bingo)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

// delete a bingo
const deleteBingo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such bingo.'})
    }

    const bingo = await Bingo.findOneAndDelete({_id: id})

    if (!bingo) {
        return res.status(400).json({error: "No such bingo."})
    }

    res.status(200).json(bingo)
}

// update a bingo
const updateBingo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such bingo.'})
    }

    const bingo = await Bingo.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!bingo) {
        return res.status(400).json({error: "No such bingo."})
    }

    res.status(200).json(bingo)
}





module.exports = {
    getBingos,
    getBingo,
    createBingo,
    deleteBingo,
    updateBingo
}
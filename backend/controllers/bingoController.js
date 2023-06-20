const Bingo = require('../models/bingoModel.js')
const mongoose = require('mongoose')

// get all bingos
const getBingos = async (req, res) => {
    const user_id = req.user._id

    const bingos = await Bingo.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(bingos)
}

// get a single bingo
const getBingo = async (req, res) => {
    const { id } = req.params

    // checks if id is not a valid mongoose string
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such bingo.'})
    }

    const bingo = await Bingo.findById(id)

    if (!bingo) {
        return res.status(404).json({error: 'No such bingo.'})
    }

    res.status(200).json(bingo)
}


// create a new bingo
const createBingo = async (req, res) => {
    const {entry} = req.body

    let emptyFields = []

    if (!entry) {
        emptyFields.push('entry')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields})
    }
    if (entry.length > 80) {
        return res.status(400).json({error: 'Entry has a max length of 80 characters.' })
    }

    // add doc to db
    try {
      const user_id = req.user._id
      const bingo = await Bingo.create({entry, user_id})
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
const Sheet = require('../models/sheetModel')
const mongoose = require('mongoose')

const getSheets = async (req, res) => {
    try {
        const sheets = await Sheet.find({}).sort({createdAt: -1})
        res.status(200).json(sheets)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const getOneSheet = async (req,res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such character sheet'})
    }

    const sheet = await Sheet.findById(id)

    if(!sheet) {
        return res.status(400).json({error: "No character sheet was found"})
    }

    res.status(200).json(sheet)
}

const createSheet = async (req, res) => {
    const {
        player_name,
        character_name,
        character_class,
        level
    } = req.body

    try {
        if(!player_name) {
            return res.json({
                error: "Please enter your name"
            })
        }
        if(!character_name) {
            return res.json({
                error: "Please enter your character's name"
            })
        }
        if(!character_class) {
            return res.json({
                error: "Please enter your class"
            })
        }

      const sheet = await Sheet.create({
        player_name,
        character_name,
        character_class,
        level
      });
      res.status(200).json(sheet)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteSheet = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'That character sheet does not exist'})
    }

    const sheet = await Sheet.findOneAndDelete({_id: id})
    if(!sheet) {
        res.status(400).json({error: "That character sheet does not exist"})
    }

    res.status(200).json(sheet)
}

const updateSheet = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'That character sheet does not exist'})
    }

    const sheet = await Sheet.findByIdAndUpdate({_id: id}, {
        ...req.body
    })
    if(!sheet) {
        res.status(400).json({error: "That character sheet does not exist"})
    }
    res.status(200).json(sheet)
}


module.exports = {
    getSheets,
    getOneSheet,
    createSheet,
    deleteSheet,
    updateSheet
}
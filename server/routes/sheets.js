const express = require('express')
const cors = require('cors')
const {
    getSheets,
    createSheet,
    getOneSheet,
    deleteSheet,
    updateSheet,
} = require('../controller/sheetControllers')

const router = express.Router()

router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
    })
);

router.get('/', getSheets);

router.get('/:id', getOneSheet)

router.post('/', createSheet)

router.delete('/:id', deleteSheet)

router.patch('/:id', updateSheet)

module.exports = router
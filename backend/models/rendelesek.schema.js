const mongoose = require('mongoose')

const rendelesSchema = new mongoose.Schema({
    felhasznalo: {type: String, required: true},
    jatek: {type: String, required: true},
    idopont: {type: Number, required: true}
},{collection: 'rendelesek'})

module.exports = rendelesSchema
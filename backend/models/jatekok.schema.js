const mongoose = require('mongoose')

const jatekSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    cim: {type: String, required: true},
    ar: {type: Number, required: true},
    leiras: {type: String, required: true},
    ertekeles: {type: Number, required: true}
},{collection: 'jatekok'})

module.exports = jatekSchema
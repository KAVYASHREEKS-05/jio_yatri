const mongoose = require('mongoose');
const enterpriseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true ,unique: true},
    company: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Enterprise', enterpriseSchema);

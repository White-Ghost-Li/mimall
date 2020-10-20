const mongoose = require('mongoose')
const adminSchema = require('../schemas/admins')

module.exports = mongoose.model('Admin', adminSchema)

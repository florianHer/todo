const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    info: String,
    create_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
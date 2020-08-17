const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    title: String,

    url: String,

    user_id: String,
    
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
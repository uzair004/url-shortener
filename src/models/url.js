const mongoose = require('mongoose');
const nanoId = require('nanoid');

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: nanoId.nanoid()
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl;
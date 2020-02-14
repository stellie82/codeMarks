const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    alias: [
        {
            type: String
        }
    ],
    popularity: {
        type: Number,
        default: 0,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isLanguage: {
        type: Boolean
    }
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;

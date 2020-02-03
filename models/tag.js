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
    date: {
        type: Date,
        default: Date.now
    }
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
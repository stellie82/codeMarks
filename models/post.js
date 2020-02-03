const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        require: true,
    },
    description: String,
    content: {
        type: String,
        require: true,
    },
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    tag: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tag",
            required: true,
        }
    ],
    attribute: String,
    votes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
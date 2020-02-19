const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    starred: Boolean,
    sel_start: Number,
    sel_end: Number,
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    content: {
      type: String,
      required: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

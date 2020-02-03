const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId,
        ref: "Post",

    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    starred: Boolean,
    sel_start: Number,
    sel_end: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
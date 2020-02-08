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
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    tags: [
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

// Create virtual method which returns the Post data WITHOUT comments
postSchema.virtual("getPostDetailsWithoutComments").get(function() {
    let result = this;
    delete result.comments;
    return result;
});

// Create virtual method to return only comments of Post
postSchema.virtual("getPostComments").get(function() {
    return this.comments;
});

// Create virtual method to return Post data with NO MORE THAN the first 500 characters of content
postSchema.virtual("getPostPreviewDetails").get(function() {
    let result = this;
    this.content = this.content.substr(0,500);
    return result;
});

module.exports = Post;
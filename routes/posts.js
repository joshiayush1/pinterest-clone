var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Post", postSchema);

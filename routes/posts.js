var mongoose = require("mongoose");
// var plm = require("passport-local-mongoose");
// var userModel = require("./users");

var postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// postSchema.plugin(plm);
module.exports = mongoose.model("Post", postSchema);

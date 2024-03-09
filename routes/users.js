var mongoose = require("mongoose");
var plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/pinterestdb");

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profilePicture: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
});

userSchema.plugin(plm);
module.exports = mongoose.model("User", userSchema);

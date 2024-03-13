const express = require("express");
const router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const upload = require("./multer")

passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/register", function (req, res) {
  res.render("register");
});

router.get("/profile", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({username: req.session.passport.user});
  res.render("profile", {user});
});

router.get("/addpost", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({username: req.session.passport.user});
  res.render("add", {user});
});

router.get("/nav", isLoggedIn, async function (req, res) {
  res.render("nav");
});

router.post("/fileupload", isLoggedIn, upload.single("image"), async function (req, res) {
  const user = await userModel.findOne({username: req.session.passport.user});
  user.profilePicture = req.file.filename;
  await user.save();
  res.redirect("/profile");
});

router.get("/feed", function (req, res) {
  res.render("feed");
});

router.post("/register", function (req, res) {
  const { username, email, fullname, password } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password, function (err, user) {
    if (err) {
      console.error("Error registering user:", err);
      return res.redirect('/register');
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    }); 
  });
});

router.post("/login",passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/register",
  })
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err){
    if(err){return next(err);}
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/register");
}


module.exports = router;

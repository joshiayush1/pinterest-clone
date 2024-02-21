var express = require("express");
var router = express.Router();
var userModel = require("./users");
var postModel = require("./posts");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;

passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res) {
  res.render("index");
});

router.get('/signup', function(req, res){
  res.render('signup');
 });

router.get("/profile", isLoggedIn, function (req, res, next) {
  res.send("Welcome to profile");
});

router.post("/register", function (req, res) {
    const userData = {
      username: req.body.username,
      email: req.body.email,
    };
    userModel.register(userData, req.body.password).then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});


router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) { }
);

router.get("/logout", function (req, res) {
  req.logOut(function (error) {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else{
    res.redirect("/");
  }
}

module.exports = router;

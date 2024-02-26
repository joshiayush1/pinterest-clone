const express = require("express");
const router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/register", function (req, res) {
  res.render("register");
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
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
    // failureRedirect: "/register",
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
  // res.redirect("/register");
}

module.exports = router;

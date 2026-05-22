const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");   // ✅ added
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const usercontroller  = require("../controllers/user.js")

// Signup GET and signup post

router
.route("/signup")
.get( usercontroller.renderSignupForm)
.post(wrapAsync(usercontroller.signup));


// Login GET and  Login POST
router
.route("/login")
.get( usercontroller.renderloginform)
.post(saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: true
    }),
    usercontroller.login
);

router.get("/logout",usercontroller.logout );
module.exports = router;
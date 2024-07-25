const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");
const listingController=require("../controllers/listings.js")

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));


router.route("/login")
.get((req,res)=>{res.render("users/login.ejs");})
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect: '/login', failureFlash: true}),userController.login);

router.route("/").get(listingController.showListing)

router.get("/logout",userController.logout);

module.exports = router;
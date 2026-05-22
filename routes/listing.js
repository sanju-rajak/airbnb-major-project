const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../Schema.js");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing.js");
const {isloggedIn,isOwner,validateListing,validateReview} = require("../middleware.js")
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})


const listingController = require("../controllers/listings.js")


//index route
// index route
router
.route("/")
.get(wrapAsync(listingController.index))
.post(
  isloggedIn,
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.createListing)
);

  //new route
   router.get("/new", isloggedIn ,listingController.renderNewForm );

//show route  and update route and delete route
router
.route("/:id")
.get(wrapAsync (listingController.showListing))
.put(
  isloggedIn,
  isOwner,
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.updateListing)
)
.delete(
  isOwner,
  isloggedIn,
    wrapAsync (listingController.deleteListing)
  );

//edit  route
router.get(
  "/:id/edit", 
  isOwner ,
   isloggedIn,
    wrapAsync (listingController.renderEditform ));

module.exports = router;
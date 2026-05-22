const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isloggedIn, validateReview,isReviewAuthor  } = require("../middleware.js");

const reviewcontroller = require("../controllers/reviews.js")

// POST Review
router.post("/",
    isloggedIn,
    validateReview,
    wrapAsync(reviewcontroller.createReview)
);

// DELETE Review
router.delete("/:reviewId",
    isloggedIn,
    isReviewAuthor ,
    wrapAsync(reviewcontroller.destroyReview)
);

module.exports = router;
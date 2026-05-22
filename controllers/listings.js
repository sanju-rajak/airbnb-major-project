const axios = require("axios");
const Listing = require("../models/listing");

// INDEX
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// SHOW LISTING
module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate("reviews")
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  let latitude = null;
  let longitude = null;

  if (listing.geometry?.coordinates?.length === 2) {
    longitude = Number(listing.geometry.coordinates[0]);
    latitude = Number(listing.geometry.coordinates[1]);
  }

  res.render("listings/show.ejs", {
    listing,
    latitude,
    longitude,
  });
};

// CREATE LISTING
module.exports.createListing = async (req, res) => {
  const { location, country } = req.body.listing;

  let geoData;

  try {
    const geoResponse = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: `${location}, ${country}`,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "WonderlustApp/1.0",
        },
      }
    );

    geoData = geoResponse.data;

    if (!geoData || geoData.length === 0) {
      req.flash("error", "Location not found");
      return res.redirect("/listings/new");
    }
  } catch (err) {
    console.log(err.message);
    req.flash("error", "Geocoding failed");
    return res.redirect("/listings/new");
  }

  // CREATE LISTING OBJECT
  const listingData = {
    ...req.body.listing,

    owner: req.user._id,

    image: {
      url: req.file.path,
      filename: req.file.filename,
    },

    geometry: {
      type: "Point",
      coordinates: [
        Number(geoData[0].lon),
        Number(geoData[0].lat),
      ],
    },
  };

  const newListing = new Listing(listingData);

  await newListing.save();

  req.flash("success", "Listing created successfully!");

  res.redirect("/listings");
};

// EDIT FORM
module.exports.renderEditform = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;

  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/w_250"
  );

  res.render("listings/edit.ejs", {
    listing,
    originalImageUrl,
  });
};

// UPDATE LISTING
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  // RE-GEOCODING
  const location = req.body.listing.location;
  const country = req.body.listing.country;

  const geoResponse = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: `${location}, ${country}`,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "WonderlustApp/1.0",
      },
    }
  );

  const geoData = geoResponse.data;

  if (geoData.length) {
    listing.geometry = {
      type: "Point",
      coordinates: [
        parseFloat(geoData[0].lon),
        parseFloat(geoData[0].lat),
      ],
    };
  }

  // IMAGE UPDATE
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await listing.save();

  req.flash("success", "Listing updated!");

  res.redirect(`/listings/${id}`);
};

// DELETE LISTING
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing deleted successfully");

  res.redirect("/listings");
};
// geoFix.js
const mongoose = require("mongoose");
const axios = require("axios");
const Listing = require("./models/listing");

async function geoFix() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");

  const listings = await Listing.find({});

  for (let listing of listings) {
    if (listing.geometry && listing.geometry.coordinates?.length === 2) continue;

    try {
      const geo = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: `${listing.location}, ${listing.country}`,
            format: "json",
            limit: 1,
          },
          headers: {
            "User-Agent": "WonderlustApp/1.0",
          },
        }
      );

      if (geo.data.length) {
        listing.geometry = {
          type: "Point",
          coordinates: [
            parseFloat(geo.data[0].lon),
            parseFloat(geo.data[0].lat),
          ],
        };

        await listing.save();
        console.log("Updated:", listing.location);
      }
    } catch (err) {
      console.log("Error:", listing.location);
    }
  }

  console.log("DONE");
  mongoose.connection.close();
}

geoFix();
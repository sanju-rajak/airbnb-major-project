const mongoose = require("mongoose");
const Data = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
  .then(() => {
    console.log("connected to db");
    initDB();
  })
  .catch((err) => {
    console.log(err);
  });

 async function main() {
  await mongoose.connect(MONGO_URL); 
};

const initDB= async () => {
  await Listing.deleteMany({}); 
  Data.data = Data.data.map((obj) => ({
    ...obj,
    owner: "69ff5eb55ba169d826076e2f"}) );
  await Listing.insertMany(Data.data); 
  console.log("data was initialized");
};
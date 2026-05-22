if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const flash = require('connect-flash');
const passport = require("passport");
const localStrategy = require("passport-local")
const user = require("./models/user.js");


const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js")

const dbUrl = process.env.ATLASDB_URL;
main().then(() =>{
    console.log("connected to db")
}).catch(err =>{
    console.log(err)  
})
async function main(){
    await mongoose.connect(dbUrl)
}

app.set("view engine" ,"ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname,"/public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error",() =>{
    console.log("Error in MONGO SESSION STORE",err)
});

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000, //oneWeek
        maxAge: + 7 * 24 * 60 * 60 * 1000,
        httponly:true,
    },
};




app.use(session( sessionOptions))
app.use(flash());

 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new localStrategy(user.authenticate()));

 passport.serializeUser(user.serializeUser());
 passport.deserializeUser(user.deserializeUser());


app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;  
    next();
});


app.use("/listings/:id/reviews", reviewsRouter);   
app.use("/listings", listingsRouter);             
app.use("/users", userRouter);

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});
app.use(( err, req, res, next) => {
   let {statusCode=500, message="somthind went wrong!"} =err;
  res.status(statusCode).render("error", { error: err });
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080")
})

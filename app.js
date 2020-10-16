const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/users");
const authRoutes = require("./api/routes/authenticate");
const websiteRoutes = require("./api/routes/website");
const firebase = require("firebase");
const app = express();

var firebaseConfig = {
    apiKey: "AIzaSyDuAjD8b-UY_6bIT_GbGUif1_sWJIEDGHs",
    authDomain: "authenticationapp-4508f.firebaseapp.com",
    databaseURL: "https://authenticationapp-4508f.firebaseio.com",
    projectId: "authenticationapp-4508f",
    storageBucket: "authenticationapp-4508f.appspot.com",
    messagingSenderId: "959727744349",
    appId: "1:959727744349:web:b55f747e6f843bbe1da4b4"
  };
firebase.initializeApp(firebaseConfig);

app.use(morgan('dev'));// to log the requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=> {
    res.header("Access-Control-Allow-Origin", "*"); 
    //can restrict access to the API here by using specific URLs rather than *
    res.header("Access-Control-Allow-Headers", 
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
        return res.status(200).json({

        });
    }
    next();
});

app.use("/users", userRoutes);
app.use("/authenticate", authRoutes);
app.use("/website", websiteRoutes);

// to handle all the requests that are not intended
app.use((req,res,next)=>{ 
    const error = new Error("URI not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

module.exports = app;
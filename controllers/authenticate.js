const firebase = require('firebase');
// const request = require('request');
// const User = require("../models/users");
const Notification = require("../controllers/sendNotification");

//Auth Control
exports.authenticate = (req, res , next) =>{
    const id = req.params.userID;
    firebase.database().ref('/users/' + id).once('value').then(function(snapshot) {
        if(snapshot.val()){
            var userID = snapshot.val().uID;
            ref = firebase.database().ref("notifications").child(userID);  
            ref.push().set({
              message: "Authentication Request",
              type:"request"
            }).then(()=>{
                res.status(200).json({
                    message: "Notification Sent",
                    error: err
                });
            }).catch( err =>
                {
                    res.status(404).json({
                        message: "Auth Failed",
                        error: err
                    });
                }
            );
        }
        else{
            res.status(400).json({
                message: "User Does Not Exist "
            }); 
        }  
    })
    .catch( err=>{
        res.status(404).json({
            message: "Auth Failed",
            error: err
        });
    });   
}

exports.forgetMobile = (req, res , next) =>{
    const email = req.params.userID;
    //use the email to send the push notification to the mobile
    res.status(200).json({
        message: "This is the /user/alternate auth route",
        email:"the user id is "+ email,
    })
}

exports.otpAuth = (req, res , next) =>{
    const email = req.params.userID;
    const otp = req.body.otp;
    //here use onetime password auth
    //use the email to send the push notification to the mobile
    res.status(200).json({
        message: "This is the /user/alternate auth route",
        email:"the user id is "+ email,
    })
}
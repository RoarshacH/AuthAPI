const firebase = require("firebase");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res , next) =>{
    const email = req.body.email;
    firebase.database().ref('/admins/' + email).once('value').then(function(snapshot) {
        if(snapshot.val()){
            res.status(422).json({
                message:"User with the Email already exists"
            });
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if (err){
                    res.status(500).json({
                        message: "Error",
                        err: err
                    });
                }
                else{
                    firebase.database().ref('admins/' + email).set({
                        email: email,
                        password: hash
                    })
                    .then((doc) =>{
                        res.status(200).json({
                            message:  "success new website is registered",
                        });
                    }).catch((err)=>{
                        res.status(500).json({
                            message: "Error in creating the new website",
                            err: err
                        });
                    });
                }
        });
        }
    })
    .catch(err => {
        res.status(400).json({
            message: err
        })
    });
}

exports.login = (req, res , next) =>{
    const email = req.body.email;
    firebase.database().ref('/admins/' + email).once('value').then(function(snapshot) {
        if(snapshot.val()){
            bcrypt.compare( req.body.password, snapshot.val().password, (err, result)=>{
                if(err){
                    res.status(401).json({
                        message: "Auth Failed"
                    })
                }
                if(result){    
                    const token = jwt.sign({
                        email: snapshot.val().email
                    }, process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                    res.status(200).json({
                        message: "Auth Successful",
                        token: token
                    })
                }
                else{
                    res.status(401).json({
                        message: "Auth Failed"
                    }) 
                }
            })
        }
        else{
            res.status(422).json({
                message:"Auth Failed"
            });
        }
    })  
    .catch((err)=>{
            res.status(500).json({
                message: "Auth Error",
                err: err
            });
        });

}
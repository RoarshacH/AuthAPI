const firebase = require("firebase");
const bcrypt = require("bcrypt");

exports.getUser = (req, res , next) =>{
    const id = req.params.userID;
    firebase.database().ref('/users/' + id).once('value').then(function(snapshot) {
        if(snapshot.val()){
            res.status(200).json({
                email: snapshot.val().email,
                password: snapshot.val().password,
                uID: snapshot.val().uID
            });
        }
        else{
            res.status(400).json({
                message: "User Does Not Exist "
            }); 
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    });
}

exports.newUser = (req, res , next) =>{
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(function success(userData){
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if (err){
                res.status(500).json({
                    message: "Error",
                    err: err
                });
            }
            else{
                const uID = userData.user.uid;
                firebase.database().ref('/users/' + uID).set({
                    email: req.body.email,
                    password: hash,
                    uID:uID,
                    device_token:" "
                }).then(()=>{
                    res.status(200).json({
                    message: "New user is successfully created",
                    data:
                        {
                            email:req.body.email,
                            password:req.body.password,
                            uID:uID,
                            app:"https://drive.google.com/file/d/16yywNNgWN1duAJ-ChGZv9er1g77p8W-R/view?usp=sharing";
                        }
                    })}
                )
                .catch(function failure(error) {
                    res.status(400).json({
                        message: "Error",
                        err: error.message
                    });
                });
            }
    });
    }).catch(err=>{
        res.status(500).json({
            message: "Error",
            err: err
        });
    });
}

exports.updateUser = (req, res , next) =>{
    const id = req.params.userID;
    firebase.database().ref('/users/' + id).set({

        })
        .then(doc=>{
        res.status(200).json({
            message: "This is the /user/auth route to edit User",
        })
            }
        ).catch(err=>{
        res.status(500).json({
            message: "Error updating the user",
        })
        });
}

exports.deleteUser = (req, res , next) =>{
    const id = req.params.userID;
    firebase.database().ref('/users/' + id).remove().then( result=>{
        res.status(200).json({
            message: "user is deleted"
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err,
        })
    });
}
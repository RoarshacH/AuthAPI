const firebase = require("firebase");
const generator = require('generate-password');

exports.getUser = (req, res , next) =>{
    const id = req.params.userID;
    firebase.database().ref('/users/' + id).once('value').then(function(snapshot) {
        if(snapshot.val()){
            res.status(200).json({
                username: snapshot.val().username,
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
        res.status(400).json({
            message: err
        })
    });
}

exports.newUser = (req, res , next) =>{
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    firebase.auth().createUserWithEmailAndPassword(req.body.email, password)
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
                firebase.database().ref('users/' + uID).set({
                username: req.body.name,
                email: req.body.email,
                password: hash,
                uID:uID,
                device_token:""

            }).then(()=>{
                res.status(200).json({
                message: "New user is successfully created",
                data:{
                    username: req.body.name,
                    email:req.body.email,
                    password:password,
                    uID:uID
                    }
                })}
            )
            .catch(function failure(error) {
                res.status(400).json({
                    message: "Error",
                    error: error.message
                });
            });
            }
    });
    }).catch(err=>{
        res.status(400).json({
            message: "Error",
            error: error.message
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
        res.status(400).json({
            message: err,
        })
    });
}
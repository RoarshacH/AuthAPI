const firebase = require('firebase');
const Notification = require("../controllers/sendNotification");

//Auth Control
exports.authenticate = (req, res , next) =>{
    const id = req.params.userID;
    firebase.database().ref('/users/' + id).once('value').then(function(snapshot) {

        if(snapshot.val()){

            ref = firebase.database().ref("notifications").child(id);  
            ref.push().set({
              message: "Authentication Request",
              type:"request"
              
            })
            .then((result)=>{
                var requests = ref.child('/authRequests').child(id);
                requests.on('child_added', function(requestSnapshot) {
                    var request = requestSnapshot.val();
                    if(request.message){
                        //   requestSnapshot.ref.remove();
                        res.status(200).json({
                            message: "Authentication Success",
                            result: request.message
                        });
                    }
                    else{
                        res.status(400).json({
                            message: "Authentication Request Failed",
                            error: err
                        });
                    }
                })
                .catch(err =>{
                        res.status(404).json({
                            message: "The Authentication Device is offline",
                        });
                    }
                );
            })
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
const firebase = require("firebase");

exports.authenticate = (req, res , next) =>{
    const id = req.params.userID;
    firebase.database().ref('/users/' + id).once('value').then(function(snapshot) {
        if(snapshot.val()){
          ref = firebase.database().ref("notifications").child(id);  
          ref.push().set({
            message: "ds",
            type:"request" 
          }, function(error){
            if (error) {
              res.status(404).json({
                message: "Request Error Try the OTP Password",
            });
            } else {
                var requests = firebase.database().ref('/authRequests').child(id);
                requests.once('child_added', function(requestSnapshot) {
                    var request = requestSnapshot.val();
                    requestSnapshot.ref.remove();
                    res.status(200).json({
                        message: "Authentication Result",
                        result: request
                    });
                });
            }
          })              
          .catch(err =>{
                res.status(404).json({
                    message: "The Authentication Device is offline",
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
      .catch(err=>{
        res.status(404).json({
            message: "Auth Failed",
            error: err
            });      
        })
}


exports.forgetMobile = (req, res , next) =>{
    const id = req.params.userID;
    //use the email to send the push notification to the mobile
}

exports.otpAuth = (req, res , next) =>{
    const id = req.params.userID;
    const otp = req.body.otp;
    //here use onetime password auth
    //use the email to send the push notification to the mobile
    res.status(200).json({
        message: "This is the /user/alternate auth route",
        email:"the user id is "+ email,
    })
}
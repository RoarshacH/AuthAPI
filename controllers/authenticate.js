const firebase = require("firebase");
const sendMail = require('../middleware/sendMail');
const generator = require('generate-password');

exports.authenticate = (req, res , next) =>{
    const id = req.params.userID;
    //remove any requests remaining
    firebase.database().ref('/authRequests').child(id).remove(); 
    firebase.database().ref('/notifications').child(id).remove();

    firebase.database().ref('/users/' + id).once('value').then(function(snapshot) {
        if(snapshot.val()){
          ref = firebase.database().ref("notifications").child(id);  
          ref.push().set({
            message: "New Auth Request",
            type:"request" 
          }, function(error){
            if (error) {
              res.status(400).json({
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
          res.status(404).json({
              message: "User Does Not Exist "
          }); 
        }        
      })
      .catch(err=>{
        res.status(500).json({
            message: "Auth Failed",
            error: err
            });      
        })
}


exports.forgetMobile = (req, res , next) =>{
    const id = req.params.userID;
    var password = generator.generate({
      length: 6,
      numbers: true
    });
    //use the email to send the push notification to the mobile
    firebase.database().ref('/users/' + id).once('value').then(function(snapshot) {
      if(snapshot.val()){
        var result = sendMail(password, snapshot.val().email);
        if(result.result){
          res.status(200).json({
            message: "OTP Successfully sent to Email"
          }); 
        }
        else{
          res.status(500).json({
            message: "Server Error",
            error: result.error
            }); 
        }
      }
      else
      {
        res.status(404).json({
          message: "User Does Not Exist "
        }); 
      }
    })
    .catch(err=>{
      res.status(500).json({
          message: "Server Error",
          error: err
          });      
      })

}

exports.otpAuth = (req, res , next) =>{
    const id = req.params.userID;
    const otp = req.body.otp;
    try {
      const isValid = (otp === "12345")? true: false;
      if(isValid){
        res.status(200).json({
          message: "Authentication Successful",
          result: true
        }); 
      }
      else{
        res.status(404).json({
          message: "Authentication Failed",
          result: false
        }); 
      }
    } 
    catch (err) {
      res.status(500).json({
        message: "Server Error",
        error:err
      }); 
  
    }
    
}
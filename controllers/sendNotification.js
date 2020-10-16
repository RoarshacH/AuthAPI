const firebase = require("firebase");

exports.listenForNotificationRequests = (username) => {
  ref = firebase.database().ref();
  var requests = ref.child('notifications').child(username);
  requests.on('child_added', function(requestSnapshot) {
    var request = requestSnapshot.val();
    if(request.username === username){
        requestSnapshot.ref.remove();
        return request.message;
    }
    else{
        console.log(request);
    }
  }, function(error) {
    console.error(error);
  });
};

exports.sendNotificationToUser = (userID, sentMessage) =>{
  ref = firebase.database().ref("notifications").child(userID);  
  ref.push().set({
    message: sentMessage,
    type:"request"
  });
  return;
}

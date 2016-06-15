//var app = angular.module("myApp", []);
var app = angular.module("myApp", ["firebase"]);

// factory service
app.factory("fbMessages", ["$firebaseArray",
  function($firebaseArray) {
    var messagesRef = firebase.database().ref(); 
    var query = messagesRef.orderByChild("time").limitToLast(30);
  	return $firebaseArray(query);
  }
]);
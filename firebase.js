/*******************************************************************************
 * Firebase Initialize
 ******************************************************************************/
var firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCEibpP7gfU5J5Wu0Zt4tX0gNmTBxHnz7E",
  authDomain: "tnt-cloud-5d440.firebaseapp.com",
  databaseURL: "https://tnt-cloud-5d440.firebaseio.com"
};
firebase.initializeApp(config);

module.exports = firebase;

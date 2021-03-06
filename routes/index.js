var express = require('express');
var router = express.Router();
var firebase = require("../firebase");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  req.session.errors = null;
});

/*******************************************************************************
 * Login
 ******************************************************************************/
router.post('/login', function(req, res){

	var email = req.body.email;
	var pass = req.body.password;

  // Sign in
  firebase.auth().signInWithEmailAndPassword(email, pass)
  .then(function() {
    console.log("index.js logged in ");
    res.redirect('/core-warranty');
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    console.log("index.js err ", errorCode, errorMessage);
    if (errorCode === 'auth/wrong-password') {
      var err = "Wrong password.";
      // console.log(err);
    } else {
      var err = errorMessage;
    }
    res.render('index', { error: err});
    // [END_EXCLUDE]
  });
});
/** Login End ****************************************************************/


/*******************************************************************************
 * Logout
 ******************************************************************************/
router.post('/logout', function(req, res){
  firebase.auth().signOut();

  res.redirect('/');
});
/** Logout End ****************************************************************/


/*******************************************************************************
 * Password Reset
 ******************************************************************************/
router.post('/password-reset', function(req, res){
    var email = req.body.emailPasswordReset;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      // console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];

    res.redirect('/');
});
/** Password Reset End ********************************************************/


module.exports = router;

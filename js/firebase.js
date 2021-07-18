var firebaseConfig = {
    apiKey: "AIzaSyAfSO8C-8JJZay_chAPN9ha4tjj2ZxeXXU",
    authDomain: "oculis0925-a2b0b.firebaseapp.com",
    projectId: "oculis0925-a2b0b",
    storageBucket: "oculis0925-a2b0b.appspot.com",
    messagingSenderId: "98519760338",
    appId: "1:98519760338:web:2118993ef505498bc9dc0b",
    measurementId: "G-C290F39GBC"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// var provider = new firebase.auth.GoogleAuthProvider();
// firebase.auth().signInWithPopup(provider).then(function (result) {
// 	var token = result.credential.accessToken;
// 	var user = result.user;
// 	console.log(user)
// }).catch(function (error) {
// 	var errorCode = error.code;
// 	var errorMessage = error.message;
// 	var email = error.email;
// 	var credential = error.credential;
// });
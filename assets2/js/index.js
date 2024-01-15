// 防止網頁右鍵另存
jQuery(document).ready(function()
{
$(this).bind("contextmenu", function(e) {
        e.preventDefault();
    });
});
/*
var firebaseConfig = {
    apiKey: "AIzaSyCIzZvf736MqyBS_zCymZH5WIpeipGyCvU",
    authDomain: "myfirstpage-7adfc.firebaseapp.com",
    databaseURL: "https://myfirstpage-7adfc-default-rtdb.firebaseio.com",
    projectId: "myfirstpage-7adfc",
    storageBucket: "myfirstpage-7adfc.appspot.com",
    messagingSenderId: "408570385036",
    appId: "1:408570385036:web:2efd335127cdee7b0061a9",
    measurementId: "G-0M0B315SPN"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
*/
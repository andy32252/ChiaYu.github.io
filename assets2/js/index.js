// 防止網頁右鍵另存
jQuery(document).ready(function()
{
$(this).bind("contextmenu", function(e) {
        e.preventDefault();
    });
});

var firebaseConfig = {
    apiKey: "AIzaSyAcSl3u5DKAeayXUUKO1FiK8ORowV2M-ag",
    authDomain: "test2-47f5c.firebaseapp.com",
    projectId: "test2-47f5c",
    storageBucket: "test2-47f5c.appspot.com",
    messagingSenderId: "474443422623",
    appId: "1:474443422623:web:857ee7cd8e7465dba6fbaa",
    measurementId: "G-ZSDNCHSD4F"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

db.ref("/chinese")
var path = "chinese";
db.ref(`/${path}`)

.set(data)

db.ref("/chinese/Bob").set({
    grade: 80
})
.then(function () {
    alert("建立成功");
}).catch(function () {
    alert("伺服器發生錯誤，請稍後再試");
});
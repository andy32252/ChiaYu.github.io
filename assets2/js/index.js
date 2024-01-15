// 防止網頁右鍵另存
jQuery(document).ready(function()
{
$(this).bind("contextmenu", function(e) {
        e.preventDefault();
    });
});

const firebaseConfig = {
  apiKey: "AIzaSyAOncDxiVdxErSR8IGy2bOKyBYcKJ2o_7E",
  authDomain: "pagetest-20568.firebaseapp.com",
  projectId: "pagetest-20568",
  storageBucket: "pagetest-20568.appspot.com",
  messagingSenderId: "813105388025",
  appId: "1:813105388025:web:0cd0a15a8e2676883a0528",
  measurementId: "G-WFVHF0FV22"
};



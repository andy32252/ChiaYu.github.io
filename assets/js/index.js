// 防止網頁右鍵另存
jQuery(document).ready(function () {
	$(this).bind('contextmenu', function (e) {
		e.preventDefault();
	});
});

var firebaseConfig = {
	apiKey: 'AIzaSyAcSl3u5DKAeayXUUKO1FiK8ORowV2M-ag',
	authDomain: 'test2-47f5c.firebaseapp.com',
	projectId: 'test2-47f5c',
	storageBucket: 'test2-47f5c.appspot.com',
	messagingSenderId: '474443422623',
	appId: '1:474443422623:web:857ee7cd8e7465dba6fbaa',
	measurementId: 'G-ZSDNCHSD4F'
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

function getSelfIntroductionInfo() {
	db.collection('selfintroduction')
		.get()
		.then(function (querySnapshot) {
			var introduction = '';
			querySnapshot.forEach(function (doc) {
				introduction += doc.data()['introduction'];
			});
			document.getElementById('title').innerHTML = introduction;
		});
}

function getSkillsInfo() {
	db.collection('Skills')
		.get()
		.then(function (querySnapshot) {
			var skillInfo = '<table>';
			querySnapshot.forEach(function (doc) {
				skillInfo +=
					'<tr><td width="25%" style="font-weight:bold;">' +
					doc.data()['類別'] +
					'</td><td>' +
					doc.data()['項目'] +
					'</td></tr>';
			});
			skillInfo += '</table>';
			document.getElementById('skillInfo').innerHTML = skillInfo;
		});
}

function getCertificateInfo() {
	db.collection('Certification')
		.get()
		.then(function (querySnapshot) {
			var certificateInfo = '<table>';
			querySnapshot.forEach(function (doc) {
				certificateInfo +=
					'<tr><td width="25%" style="font-weight:bold;">' +
					doc.data()['類別'] +
					'</td><td>' +
					doc.data()['項目'] +
					'</td></tr>';
			});
			certificateInfo += '</table>';
			document.getElementById('certificateInfo').innerHTML = certificateInfo;
		});
}

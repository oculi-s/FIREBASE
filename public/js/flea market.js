var sr = firebase.storage();
var _image = document.getElementById('_image');
var _url = window.opener.dataurl;
var _loginfo = window.opener.loginfo;

sr.ref(_url + '.jpg').getDownloadURL().then(function (url) {
	_image.setAttribute('src', url)
});

var _nm = document.getElementById('_nm')
var _pr = document.getElementById('_pr')
var _tm = document.getElementById('_tm')
db.collection('products')
	.where('id', '==', _url.split('/')[1])
	.where('nm', '==', _url.split('/')[2])
	.get().then(function (q) {
		var _doc = q.docs[0];
		_pr.innerText = _doc.data().pr + ' won';
		_nm.innerText = _doc.data().nm;
		_id.innerText = _doc.data().id;
		_cp.innerText = _doc.data().cp;
		_pl.innerText = _doc.data().pl;
	});

function _buy(){
	db.collection('products')
	.where('id', '==', _url.split('/')[1])
	.where('nm', '==', _url.split('/')[2])
	.get().then(function (q) {
		var _doc = q.docs[0];
		db.collection('products').doc(_doc.id).update({
			st:'sold'
		})
		alert('succesfully purchased!');
	})
}

function _add() {
	db.collection('users')
		.where('id', '==', window.opener.loginfo)
		.get().then(function (q) {
			var _doc = q.docs[0];
			
			db.collection('products')
				.where('id', '==', _url.split('/')[1])
				.where('nm', '==', _url.split('/')[2])
				.get().then(function (q) {
					_doc = q.docs[0];
					db.collection('products').doc(_doc.id).update({
						wl:firebase.firestore.FieldValue.arrayUnion(_loginfo)
					})
				})

			if (!_doc.data().cart.includes(_url)) {
				db.collection('users').doc(_doc.id).update({
					cart: firebase.firestore.FieldValue.arrayUnion(_url)
				})
				alert('added!')
			} else {
				alert('Already in cart')
			}

		})
}
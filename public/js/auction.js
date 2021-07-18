var sr = firebase.storage();
var _image = document.getElementById('_image');
var _timeinfo = document.getElementById('_timeinfo');
var _url = window.opener.dataurl;
var _loginfo = window.opener.loginfo;

sr.ref(_url + '.jpg').getDownloadURL().then(function (url) {
	_image.setAttribute('src', url)
});

var _nm = document.getElementById('_nm')
var _pr = document.getElementById('_pr')
var _tm = document.getElementById('_tm')
var _np_deny = document.getElementsByClassName('_np _deny')[0]
db.collection('products')
	.where('id', '==', _url.split('/')[1])
	.where('nm', '==', _url.split('/')[2])
	.get().then(function (q) {
		var _doc = q.docs[0];
		_timeinfo.innerText = new Date(_doc.data().dl).getTime()
		_pr.innerText = _doc.data().pr;
		_nm.innerText = _doc.data().nm;
		_id.innerText = _doc.data().id;
		_cp.innerText = _doc.data().cp;
		_pl.innerText = _doc.data().pl;
	});

setInterval(function () {
	var ddt = new Date(_timeinfo.innerText - new Date().getTime());
	var days = Math.floor(ddt.getTime()/1000/60/60/24);
	_tm.innerText = days + 'd ' + ddt.getHours() + 'h ' + ddt.getMinutes() + 'm ' + ddt.getSeconds() +'s';
}, 1000);

var _np = document.getElementById('_np')
_np.onkeyup = function (e) {
	if (e.keyCode == 13) {
		_bid()
	}
}

_np.onkeyup = function (e) {
	_np_deny.style.display = 'none';
	if (this.value) {
		_np_deny.style.display = 'none';
		if (e.keyCode == 13) {
			_bid();
		}
	} else {
		_np_deny.style.display = 'block';
	}
};

function _bid() {
	db.collection('products')
		.where('id', '==', _url.split('/')[1])
		.where('nm', '==', _url.split('/')[2])
		.get().then(function (q) {
			var _doc = q.docs[0];
			var newp = _np.value > _doc.data().pr ? _np.value : _doc.data().pr;

			db.collection('products').doc(_doc.id).update({
				hs: firebase.firestore.FieldValue.arrayUnion(_loginfo + ':' + _np.value),
				pr: newp
			})
			if (_np.value > _doc.data().pr){
				_pr.innerText = _np.value;
				_np.value = '';
			} else {
				_np_deny.style.display = 'block';
			}
		})
}

function _add() {
	if (_np_deny.style.display == 'none'){
		db.collection('users')
		.where('id', '==', window.opener.loginfo)
		.get().then(function (q) {
			var _doc = q.docs[0];
			db.collection('products')
				.where('id', '==', _url.split('/')[1])
				.where('nm', '==', _url.split('/')[2])
				.get().then(function (q) {
					_doc = q.docs[0]
					db.collection('products').doc(_doc.id).update({
						wl: firebase.firestore.FieldValue.arrayUnion(_loginfo)
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
}
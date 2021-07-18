const _nm = document.getElementById('_nm')
const _pr = document.getElementById('_pr')
const _pl = document.getElementById('_pl')
const _dl = document.getElementById('_dl')
const _img = document.getElementById('img').childNodes[1]
const _imgs = document.getElementById('_imgs')
const _prev = document.getElementById('_prev')

const _img_deny = document.getElementsByClassName('_img _deny')[0]
const _nm_deny = document.getElementsByClassName('_nm _deny')[0]
const _pr_deny = document.getElementsByClassName('_pr _deny')[0]
const _pl_deny = document.getElementsByClassName('_pl _deny')[0]
const _dl_deny = document.getElementsByClassName('_dl _deny')[0]
const _dup_deny = document.getElementsByClassName('_dup _deny')[0]
const _loginfo = window.opener.loginfo

_nm.onkeyup = function (e) {
	_dup_deny.style.display = 'none';
	_nm_deny.style.display = 'none';
	if (this.value) {
		_nm_deny.style.display = 'none';
		if (e.keyCode == 13) {
			main();
		}
	} else {
		_nm_deny.style.display = 'block';
	}
};
_pr.onkeyup = function (e) {
	_pr_deny.style.display = 'none';
	if (this.value) {
		_pr_deny.style.display = 'none';
		if (e.keyCode == 13) {
			main();
		}
	} else {
		_pr_deny.style.display = 'block';
	}
};
_pl.onkeyup = function (e) {
	_pl_deny.style.display = 'none';
	if (this.value) {
		_pl_deny.style.display = 'none';
		if (e.keyCode == 13) {
			main();
		}
	} else {
		_pl_deny.style.display = 'block';
	}
};

_cp.onkeyup = function (e) {
	_cp_deny.style.display = 'none';
	if (this.value) {
		_cp_deny.style.display = 'none';
		if (e.keyCode == 13) {
			main();
		}
	} else {
		_cp_deny.style.display = 'block';
	}
};

_dl.onkeyup = function (e) {
	_dl_deny.style.display = 'none';
	if (this.value) {
		_dl_deny.style.display = 'none';
		if (e.keyCode == 13) {
			main();
		}
	} else {
		_dl_deny.style.display = 'block';
	}
};

_buyer.onchange = function(){
	if (this.checked){
		_dl.style.display = 'block';
	} else {
		_dl.style.display = 'none';
	};
};

function main() {
	db.collection('products').where('id','==',_loginfo).where('nm', '==', _nm.value).get().then(function (q) {
		if (q.docs.length) {
			_dup_deny.style.display = 'block';
		} else if (!_nm.value) {
			_nm_deny.style.display = 'block';
		} else if (!_pr.value) {
			_pr_deny.style.display = 'block';
		} else if (!_cp.value) {
			_cp_deny.style.display = 'block';
		} else if (!_pl.value) {
			_pl_deny.style.display = 'block';
		} else if (!_seller.checked && !_buyer.checked) {
			_sb_deny.style.display = 'block';
		} else if (!_img.files[0]) {
			_img_deny.style.display = 'block';
		} else if (_buyer.checked && !_dl.value){
			_dl_deny.style.display = 'block';
		} else if (_buyer.checked && new Date().getTime()>new Date(_dl.value).getTime()){
			_dl_deny.style.display = 'block';
		} else {
			var metadata = {
				contentType: 'image/jpeg'
			};
			firebase.storage().ref()
				.child('images/' + _loginfo + '/' + _nm.value + '.jpg')
				.put(_img.files[0], metadata)
				.then(
					db.collection("products").add({
						nm: _nm.value,
						pr: _pr.value,
						id: _loginfo,
						cp: _cp.value,
						pl: _pl.value,
						fa: _seller.checked ? "flea market" : "auction",
						st: 'selling',
						hs: '',
						wl: '',
						dl: _dl.value
					}));
			db.collection("users").where('id', '==', _loginfo).get().then(function (q) {
				var _doc = q.docs[0];
				db.collection("users").doc(_doc.id).update(
					'prs', firebase.firestore.FieldValue.arrayUnion(_nm.value)
				).then(_reload);
			})
		}
	})
}

function _preview(input) {
	if (input.files && input.files[0]) {
		_img_deny.style.display = 'none';
		_imgs.style.display = 'none';
		_prev.style.display = 'block';
		var reader = new FileReader();
		reader.onload = function (e) {
			_prev.setAttribute('src', e.target.result);
		};
		reader.readAsDataURL(input.files[0]);
	}
}

function _reload() {
	_nm.value = '';
	_pr.value = '';
	_cp.value = '';
	_pl.value = '';
	_dl.value = '';
	_dl.style.display = 'none';
	_seller.checked = false;
	_buyer.checked = false;
	_imgs.style.display = 'block';
	_prev.style.display = 'none';
	_img_deny.style.display = 'none';
	_dl_deny.style.display = 'none';
}

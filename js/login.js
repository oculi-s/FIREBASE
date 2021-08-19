function main() {
	if (_id.value == 'admin' && _pw.value == 'admin') {
		location.replace('./admin.html');
	} else if (!_seller.checked && !_buyer.checked) {
		_sb_deny.style.display = 'block';
	} else if (!_id.value) {
		_id_deny.style.display = 'block';
	} else if (!_pw.value) {
		_pw_deny.style.display = 'block';
	}
	else {
		db.collection("users").get().then(function (q) {
			var _islogin = false;
			for (var i in q.docs) {
				var doc = q.docs[i];
				var c1 = doc.data().id == _id.value;
				var c2 = doc.data().pw == _pw.value;
				var c3 = doc.data().sb == (_seller.checked ? "seller" : "buyer");
				if (c1 && c2 && c3) {
					_main_deny.style.display = 'none';
					_islogin = true;
					_loadpage();
					break;
				}
			}
			if (!_islogin) {
				_main_deny.style.display = 'block';
			}
		});
	}
}

_id.onkeyup = function (e) {
	_main_deny.style.display = 'none';
	if (this.value) {
		_id_deny.style.display = 'none';
		if (e.keyCode == 13) {
			main();
		}
	} else {
		_id_deny.style.display = 'block';
	}
};

function _loadpage() {
	this.loginfo = _id.value;
	if (_seller.checked) {
		window.open('./seller/seller.html');
	} else if (_buyer.checked) {
		window.open('./buyer/buyer.html');
	}
}

var _duplicated = false;
var _dup_deny = document.getElementsByClassName('_dup _deny')[0];
var _dup_accept = document.getElementsByClassName('_dup _accept')[0];
var _dup_need = document.getElementsByClassName('_dup _need')[0];

function main() {
	if (!_seller.checked && !_buyer.checked) {
		_sb_deny.style.display = 'block';
	} else if (!_id.value) {
		_id_deny.style.display = 'block';
	} else if (!_duplicated) {
		_dup_need.style.display = 'block';
	} else if (!_pw.value) {
		_pw_deny.style.display = 'block';
	} else if (!_ml.value) {
		_ml_deny.style.display = 'block'
	} else if (_ml_deny.style.display != 'block') {
		if (_pw.value != _cp.value) {
			_cp_deny.style.display = 'block';
		} else {
			_cp_deny.style.display = 'none';
			db.collection("users").add({
				id: _id.value,
				pw: _pw.value,
				ml: _ml.value,
				sb: _seller.checked ? "seller" : "buyer",
				cart: [],
				prs: []
			}).then(function () {
				location.reload();
			});
		}
	}
	if (_duplicated) {
		_dup_need.style.display = 'none';
	}
}

_ml.onkeyup = function (e) {
	if (e.keyCode == 13) {
		main();
	}
	if ((_seller.checked || _buyer.checked) && _id.value) {
		if (_ml.value) {
			if (_ml.value.split('.').length != 2) {
				_ml_deny.style.display = 'block';
			} else {
				if (_ml.value.split('.')[0].split('@').length != 2) {
					_ml_deny.style.display = 'block';
				} else {
					_ml_deny.style.display = 'none';
				}
			}
		} else {
			_cp_deny.style.display = 'none';
			_ml_deny.style.display = 'block';
		}
	}
}

_cp.onkeyup = function (e) {
	if (e.keyCode == 13) {
		main();
	}
};

_id.onkeyup = function (e) {
	_dup_accept.style.display = 'none';
	_dup_deny.style.display = 'none';
	_dup_need.style.display = 'none';
	if (this.value) {
		_id_deny.style.display = 'none';
		if (e.keyCode == 13) {
			duplicate();
		} else {
			_duplicated = false;
		}
	} else {
		_duplicated = false;
		_id_deny.style.display = 'block';
	}
}

function duplicate() {
	if (!_seller.checked && !_buyer.checked) {
		_sb_deny.style.display = 'block';
	} else if (_id.value) {
		db.collection("users").get().then(function (q) {
			_duplicated = true;
			for (var i in q.docs) {
				const doc = q.docs[i]
				if (_id.value == doc.data().id) {
					var c1 = _seller.checked && (doc.data().sb == 'seller');
					var c2 = _buyer.checked && (doc.data().sb == 'buyer');
					if (c1 || c2) {
						_dup_accept.style.display = 'none'
						_dup_deny.style.display = 'block'
						_duplicated = false;
						break;
					}
				}
			}
			if (_duplicated) {
				_dup_accept.style.display = 'block'
				_dup_deny.style.display = 'none'
			}
		});
	} else {
		_duplicated = false;
		_id_deny.style.display = 'block'
	}
}
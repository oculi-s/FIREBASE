const _select = document.getElementById('_select');
const _ms = document.getElementsByClassName('_ms')[0];
const _ms_deny = document.getElementsByClassName('_ms _deny')[0];

_id.onkeyup = function (e) {
	_id_deny.style.display = 'none';
	if (this.value) {
		_id_deny.style.display = 'none';
		if (e.keyCode == 13) {
			main();
		}
	} else {
		_id_deny.style.display = 'block';
	}
};

_ms.onkeyup = function (e) {
	_ms_deny.style.display = 'none';
	if (this.value) {
		_ms_deny.style.display = 'none';
		if (e.keyCode == 13) {
			main();
		}
	} else {
		_ms_deny.style.display = 'block';
	}
};

_ml.onkeyup = function (e) {
	if (e.keyCode == 13) {
		main();
	}
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
		_ml_deny.style.display = 'block';
	}
};

_select.onchange = function () {
	if (this.value) {
		_sb_deny.style.display = 'none';
	} else {
		_sb_deny.style.display = 'block';
	}
};

function main() {
	if (!_id.value) {
		_id_deny.style.display = 'block';
	} else if (!_ml.value) {
		_ml_deny.style.display = 'block';
	} else if (_ml_deny.style.display != 'block') {
		if (!_select.value) {
			_sb_deny.style.display = 'block';
		} else if (!_ms.value) {
			_ms_deny.style.display = 'block';
		} else {
			db.collection("messages").add({
				name: _id.value,
				email: _ml.value,
				type: _select.value,
				message: _ms.value
			}).then(function () {
				location.reload();
			});
		}
	}
}
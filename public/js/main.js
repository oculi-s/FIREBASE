const db = firebase.firestore();

const _seller = document.getElementById('_seller');
const _buyer = document.getElementById('_buyer');
const _id = document.getElementById('_id');
const _ml = document.getElementById('_ml');
const _pw = document.getElementById('_pw');
const _cp = document.getElementById('_cp');

const _sb_deny = document.getElementsByClassName('_sb')[0];
const _id_deny = document.getElementsByClassName('_id _deny')[0];
const _ml_deny = document.getElementsByClassName('_ml _deny')[0];
const _pw_deny = document.getElementsByClassName('_pw _deny')[0];
const _cp_deny = document.getElementsByClassName('_cp _deny')[0];
const _main_deny = document.getElementsByClassName('_main _deny')[0];

_seller.onclick = function () {
	if (_buyer.checked) {
		_buyer.checked = false;
	}
	if (_seller.checked) {
		_sb_deny.style.display = 'none';
	}
};

_buyer.onclick = function () {
	if (_seller.checked) {
		_seller.checked = false;
	}
	if (_buyer.checked) {
		_sb_deny.style.display = 'none';
	}
};

_seller.onkeyup = function (e) {
	if (e.keyCode == 13) {
		main();
	}
};
_buyer.onkeyup = function (e) {
	if (e.keyCode == 13) {
		main();
	}
};

_pw.onkeyup = function (e) {
	_main_deny.style.display = 'none';
	if (this.value) {
		_pw_deny.style.display = 'none';
		if (e.keyCode == 13) {
			main();
		}
	} else {
		_pw_deny.style.display = 'block';
	}
};

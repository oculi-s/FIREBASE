var _tbody = document.getElementById('_tbody');
_refresh();

function _save() {
	db.collection("users").get().then(function (q) {
		for (var i in q.docs) {
			var _doc = q.docs[i];
			var _row = document.getElementById(_doc.data().id)
			db.collection("users").doc(_doc.id).update({
				pw: _row.children[1].firstChild.value,
				ml: _row.children[2].firstChild.value,
				sb: _row.children[3].firstChild.value
			});
		}
	}).then(function () {
		alert('saved!')
		_refresh();
	});
}

function _delete(_doc_id) {
	_doc_id = _doc_id.toString();
	if (confirm("delete element")) {
		db.collection('users').doc(_doc_id).get().then(function (doc) {
			var _user_id = doc.data().id;
			console.log(_user_id);
			db.collection("products").where('id', '==', _user_id).get().then(function (q) {
				for (var i in q.docs) {
					var _doc = q.docs[i];
					db.collection('products').doc(_doc.id).delete();
					firebase.storage().ref()
					.child('images/' + _doc.data().id + '/' + _doc.data().nm + '.jpg').delete();
				}
			}).then(db.collection("users").doc(_doc_id).delete());
		}).then(_refresh);
	}
}

function _refresh() {
	_tbody.innerHTML = ''
	db.collection("users").get().then(function (q) {
		var keys = ['id', 'pw', 'ml', 'sb'];
		for (var i in q.docs) {
			var _doc = q.docs[i];
			var row = document.createElement('tr');
			row.setAttribute('id', _doc.data().id);
			for (var j in keys) {
				var td = document.createElement('td');
				var _input = document.createElement('input');
				_input.setAttribute('value', _doc.data()[keys[j]]);
				_input.onkeyup = function (e) { if (e.keyCode == 13) { _save(); } }
				td.appendChild(_input);
				row.appendChild(td);
			}
			var _doc_id = String(_doc.id)
			var btn = document.createElement('button');
			td = document.createElement('td');
			btn.setAttribute('class', '_delete')
			btn.setAttribute('onclick', `_delete("${_doc_id}")`)
			btn.innerText = 'delete';
			td.appendChild(btn);
			row.appendChild(td);

			_tbody.appendChild(row);
		}
	});
}

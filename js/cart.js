
var _tbody = document.getElementById('_tbody');
var _cart = document.getElementById('_cart');
var _loginfo = window.opener.loginfo;
_tbody.innerHTML = ''

db.collection('users')
	.where('id', '==', _loginfo)
	.get().then(function (q) {
		_cart = document.getElementById('_cart');
		_doc = q.docs[0];
		_cart.innerText = _doc.data().cart;
	})

db.collection("products").get().then(function (q) {
	var keys = ['nm', 'pr', 'pl', 'cp', 'st', 'id'];
	for (var i in q.docs) {
		_doc = q.docs[i];
		_docurl = _doc.data().id + '/' + _doc.data().nm
		if (_cart.innerText.includes(_docurl)) {
			var row = document.createElement('tr');
			row.setAttribute('id', _doc.data().id);
			for (var j in keys) {
				var td = document.createElement('td');
				td.innerText = _doc.data()[keys[j]];
				row.appendChild(td);
			}
			row.appendChild(td);
			row.setAttribute('onclick', `_loadpage('${_doc.data().fa}','${_doc.data().id}','${_doc.data().nm}')`)
			row.style.cursor = 'pointer'

			_tbody.appendChild(row);
		}
	}
});

function _loadpage(fa, id, nm) {
	this.dataurl = `images/${id}/${nm}`
	this.loginfo = window.opener.loginfo
	window.open(fa + '.html')
}
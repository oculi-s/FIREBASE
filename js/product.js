
var _tbody = document.getElementById('_tbody');
var _from = document.getElementById('_from');
var _to = document.getElementById('_to');
_tbody.innerHTML = _refresh(_tbody);

_to.onkeyup = function (e) {
    if (e.keyCode == 13) {
        _refresh()
    }
}
_from.onkeyup = function (e) {
    if (e.keyCode == 13) {
        _refresh()
    }
}
function _refresh(tbody) {
    _tbody.innerHTML = ''
    db.collection("products").get().then(function (q) {
        var keys = ['nm', 'pr', 'pl', 'cp', 'st', 'id'];
        for (var i in q.docs) {
            _doc = q.docs[i];
            c1 = _from.value <= _doc.data().pr;
            c2 = _doc.data().pr <= _to.value;
            if (c1 && c2) {
                var row = document.createElement('tr');
                for (var j in keys) {
                    var td = document.createElement('td');
                    td.innerText = _doc.data()[keys[j]];
                    row.appendChild(td);
                };
                if (_doc.data().st == 'selling') {
                    row.setAttribute('onclick', `_loadpage('${_doc.data().fa}','${_doc.data().id}','${_doc.data().nm}')`);
                    row.style.cursor = 'pointer';
                } else {
                    row.setAttribute('class', '_sold');
                };
                _tbody.appendChild(row);
            }
        }
    });
    return '';
}

function _loadpage(fa, id, nm) {
    this.dataurl = `images/${id}/${nm}`
    this.loginfo = window.opener.loginfo
    window.open(fa + '.html')
}
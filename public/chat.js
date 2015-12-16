window.onload = function () {
  var socket = io.connect();
  socket.on('connect', function () {
    // wyślij zdarzenie join z nazwą użytkownika
    socket.emit('join', prompt('Podaj swój pseudonim: '));

    // pokaż czat
    document.getElementById('chat').style.display = 'block';

    socket.on('announcement', function (msg) {
      var li = document.createElement('li');
      li.className = 'announcement';
      li.innerHTML = msg;
      document.getElementById('messages').appendChild(li);
    });
  });

  function addMessage (from, text) {
    var li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = '<b>' + from + '</b>: ' + text;
    document.getElementById('messages').appendChild(li);
    return li;
  }

  var input = document.getElementById('input');
  document.getElementById('form').onsubmit = function () {
    var li = addMessage('ja', input.value);
    socket.emit('text', input.value, function (date) {
      li.className = 'confirmed';
      li.title = date;
    });

    // wyzeruj pole tekstowe
    input.value = '';
    input.focus();

    return false;
  }

  socket.on('text', addMessage);
}

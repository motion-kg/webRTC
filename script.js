let peer;
let conn;
let fixedPeerId;

function initializePeer() {
    fixedPeerId = prompt("Enter your fixed Peer ID (e.g., 'user1' or 'user2'):");
    peer = new Peer(fixedPeerId);

    peer.on('open', function(id) {
        document.getElementById('peerId').textContent = id;
    });
    peer.on('connection', function(connection) {
        conn = connection;
        conn.on('data', function(data) {
            displayMessage(data, false);
        });
    });
}

function connectToPeer() {
    const otherPeerId = prompt("Enter the Peer ID you want to connect to (e.g., 'user1' or 'user2'):");
    conn = peer.connect(otherPeerId);
    conn.on('open', function() {
        conn.on('data', function(data) {
            displayMessage(data, false);
        });
    });
}

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    if (conn && conn.open) {
        conn.send(message);
        displayMessage(message, true);
    }
    document.getElementById('messageInput').value = '';
}

function displayMessage(message, isMine) {
    const chatWindow = document.getElementById('chatWindow');
    const messageElement = document.createElement('div');
    messageElement.className = isMine ? 'my-message' : 'other-message';
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

window.onload = function() {
    initializePeer();
}

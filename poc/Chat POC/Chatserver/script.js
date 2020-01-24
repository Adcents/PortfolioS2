const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('Wat is je naam?')
appendMessage('Welkom, je bent ingelogd')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    //console.log(data) hier logt het in de console
    appendMessage(`${data.name}: ${data.message}`) //hier logt de naam en het bericht naar de browser
})

socket.on('user-connected', name => {
    appendMessage(`${name} is geconnect`) //hier logt hij de naam van de gebruiker in de browser
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} is gedisconnect`) //zodra de gebruiker disconnect wordt dit weggeschreven
})

messageForm.addEventListener('submit', e => {
 e.preventDefault()
 const message = messageInput.value
 appendMessage(`U: ${message}`) //bericht wat je zelf verstuurd naar de andere gebruiker wordt nu ook bij jezelf gelogd dmv "U: 'message'"
 socket.emit('send-chat-message', message)
 messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
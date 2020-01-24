const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
    //console.log('New User') schrijf weg als er een nieuwe gebruiker komt (nieuwe connectie)
    //socket.emit('chat-message', 'Goedendag!') //bij elke connectie tot de server krijg je de message Goedendag.
    
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name) //stuurt naar alle andere users dat er een gebruiker geconnect is en geeft ook de naam mee.

    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] }) //stuurt naar alle andere users het gestuurde bericht en geeft ook het socket id mee
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]) //stuurt naar alle andere users dat er een gebruiker gedisconnect is en geeft het socket id mee
        delete users[socket.id]
    })
})
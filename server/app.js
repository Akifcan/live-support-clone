const http = require('http').createServer()
const io = require('socket.io')(http)

http.listen(3000, () => console.log('Working on 3000'))

io.on('connection', socket => {
    console.log('Connection!')

    socket.on('sendRequest', userData => {
        socket.join(userData.id)
        io.emit('newUser', userData)

        socket.on('message', message => {
            console.log(message)
            io.to(userData.id).emit('newMessage', {
                user: userData.name,
                message
            })
        })

    })

    socket.on('startChat', userData => {
        socket.join(userData.id)
        io.to(userData.id).emit('showChatScreen', {
            user: 'admin',
            message: 'hoş geldiniz size nasıl yardım edebilirim?'
        })
        socket.on('message', message => {
            console.log(message)
            io.to(userData.id).emit('newMessage', {
                user: 'admin',
                message
            })
        })
        socket.on('endSupport', () => {
            io.to(userData.id).emit('endSupport')
            socket.leave(userData.id)
        })
    })

 

})
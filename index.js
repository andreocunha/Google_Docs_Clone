const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let port = process.env.PORT || 4000;

let texto = ''

app.use(express.static('public'));

http.listen(port, function () {
    console.log('listening on port 4000')
})
  
io.on('connection', socket => {
    console.log('Novo usuário')

    socket.emit('textoServidor', texto);

    socket.on('textoUsuario', (value) => {
        texto = value
        io.emit('textoServidor', value)
    })
})

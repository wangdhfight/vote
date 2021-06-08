/* socket.io 建立websocket */
const http = require('http')
const SocketIO = require('socket.io')
const server = http.createServer()
const io = SocketIO({port: 81})

exports.server = server
exports.io = io
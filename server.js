const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);

// Thiết lập CORS cho Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "https://nguoilaoi.amazingtech.cc",  // Chỉ định domain bạn muốn cho phép
    methods: ["GET", "POST"],  // Các phương thức được phép
    credentials: true,  // Cho phép gửi thông tin xác thực (cookies, HTTP headers...)
  }
});

io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('signal', (data) => {
    io.to(data.to).emit('signal', {
      from: socket.id,
      signal: data.signal,
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

server.listen(3333, () => console.log('Signaling server running on port 3333'));

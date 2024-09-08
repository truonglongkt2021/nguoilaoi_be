const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);

// Thiết lập CORS và cấu hình Socket.IO để tránh timeout
const io = socketIo(server, {
  cors: {
    origin: "https://apinguoilaoi.amazingtech.cc",  // Thay thế bằng domain của bạn
    methods: ["GET", "POST"],
    credentials: true
  },
  pingInterval: 25000,  // Thời gian giữa mỗi lần ping (25 giây)
  pingTimeout: 60000    // Thời gian chờ phản hồi trước khi timeout (60 giây)
});

io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('join-room', (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    const numClients = room ? room.size : 0;

    if (numClients < 3) {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
      socket.to(roomId).emit('new-user', socket.id);
    } else {
      socket.emit('room-full', 'Room is full, max 3 users allowed');
    }
  });

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

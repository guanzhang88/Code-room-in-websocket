const express = require('express');
const app = express();
const PORT = 4000;

const { Server } = require('socket.io');

// 新导入的模块
const server = require('http').Server(app);
const cors = require('cors');

const socketIO = new Server(
    server,
    {
        cors: {
            origin: 'http://localhost:3000',
        }
    }
);

// 存储房间号数据的数组
let roomList = [];

app.use(cors());

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} 用户已连接!`);

    // 监听和在控制台打印消
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
    });

    // 监听新用户的登录
    socket.on('joinRoom', (data) => {
        // 将新用户添加到数组中
        let checked = false;
        if (roomList.find((item) => item === data)) {
            checked = true;
        }
        // 将用户列表发送给客户端
        socketIO.emit('joinRoomResponse', checked);
    })

    socket.on('typing', (data) => {
        // 将用户正在输入的信息发送给客户端
        socket.broadcast.emit('typingResponse', data);
    })

    socket.on('cancelTyping', (data)=>{
        socket.broadcast.emit('cancelTypingResponse', data);
    })

    socket.on('disconnect', () => {
        console.log('🔥: 一个用户已断开连接');
        // 当用户下线时更新用户列表
        // users = users.filter((user) => user.socketID !== socket.id);
        // socketIO.emit('userList', users);
        socket.disconnect();
    });
});


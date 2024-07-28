import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Replace with your frontend URL
        methods: ['GET', 'POST']
    }
});

app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend URL
}));

app.get('/', (req, res) => {
    res.send('Chat server is running');
});

interface Message {
    text: string;
    sender: string;
    avatar: string;
}

io.on('connection', (socket: Socket) => {
    socket.on('message', (message: Message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

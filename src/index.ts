import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,
        methods: ['GET', 'POST']
    }
});

app.use(cors({
    origin: FRONTEND_URL
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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

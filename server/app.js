const express = require('express');
const PatientRouter = require('./routes/patient.route');
const http = require('http')
const {Server} = require('socket.io');
const { loggerMiddleware, errorMiddleware, authMiddleware } = require('./middleware/auth.middleware');
const patientAuth = require('./routes/patient.auth.route');
const cookieParser = require("cookie-parser");
require('dotenv').config()
const rateLimit = require('express-rate-limit');
const cors = require('cors');




const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow Vite frontend
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});


// Create a rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max:100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' },
});


const PORT = process.env.PORT;

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(errorMiddleware)
app.use(cookieParser());
app.use('/api/', limiter);



// WebSockets connection
io.on('connection', (socket) => {
    console.log('A user connected',socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected',socket.id);
    });
});

// Attach WebSocket instance to app
app.set("io", io);



app.use('/api/v1/patient',authMiddleware,PatientRouter)
app.use('/api/v1/patient-auth',patientAuth)


// Basic route
app.get('/',(req, res) => {
    res.send('Hello, World!');
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports={app,io,server}
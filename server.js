const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

//Connect Database
connectDB();

//Initial Middleware

app.use(express.json({ extend: false }));
app.use(cors({ origin: 'https://localhost:5000' }));
//Test API Running Check

app.get('/', (req, res) => res.send('API Running'));

//Define API Router connection
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

const PORT = process.env.PORT || 5000; //Production Port or 5000 local port

// Listen port

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));

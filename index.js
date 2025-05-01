const express  = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const api = require('./Doctor');
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

const MONGODB_URL = process.env.MONGODB_API;

mongoose.connect(MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err.message ));

app.use('/api/doctors', api )
    
app.get('/', (req, res) => {
    res.send('Server is working!');
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});
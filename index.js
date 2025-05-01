const express  = require('express')
const mongoose = require('mongoose')
const app = express();
const PORT = 3000;

const MONGODB_URL = 'mongodb://127.0.0.1:27017/doctor';

mongoose.connect(MONGODB_URL)
// , {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
// })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err ));

app.get('/', (req, res) => {
    res.send('Server is working!');
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});
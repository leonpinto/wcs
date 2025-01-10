require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');

app.use(express.json());

app.get('/api', (req, res) => {
    res.json(db)
});

app.listen(PORT, () => {});

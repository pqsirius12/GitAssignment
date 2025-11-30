const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/feedback', (req, res) => {
    const sql = 'SELECT * FROM feedback ORDER BY created_at DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

app.post('/api/feedback', (req, res) => {
    const { name, email, message, rating } = req.body;
    const sql = 'INSERT INTO feedback (name, email, message, rating) VALUES (?,?,?,?)';
    const params = [name, email, message, rating];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: { id: this.lastID, ...req.body },
            id: this.lastID
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

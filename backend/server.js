const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'state.json');

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Helper to read state
const readState = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return null;
    }
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading state:", err);
        return null;
    }
};

// Helper to write state
const writeState = (state) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error("Error writing state:", err);
        return false;
    }
};

// GET current state
app.get('/api/state', (req, res) => {
    const state = readState();
    if (!state) {
        return res.status(404).json({ error: "State not found" });
    }
    res.json(state);
});

// POST update state
app.post('/api/state', (req, res) => {
    const newState = req.body;
    if (writeState(newState)) {
        res.json({ message: "State saved successfully" });
    } else {
        res.status(500).json({ error: "Failed to save state" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

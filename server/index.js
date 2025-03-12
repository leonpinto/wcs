require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import DB2 connection, authentication & deposit services
const { getConnection } = require('./DB2Connection');
const { registerUser, loginUser } = require('./AuthService');
const { deposit } = require('./DepositService');
const { fetchAllUsers } = require('./fetchUsersService');

app.use(express.json());

// **Test endpoint to check DB connection**
app.get('/api/test-db', async (req, res) => {
    try {
        const conn = await getConnection();
        if (conn) {
            res.json({ success: true, message: "Connected successfully to DB2" });
            conn.closeSync();
        }
    } catch (err) {
        console.error("DB connection error:", err);
        res.status(500).json({ success: false, message: "Failed to connect to DB2", error: err.message });
    }
});

// **Register a new user**
app.post('/api/register', async (req, res) => {
    const { name, email, password, balance } = req.body;

    if (!name || !email || !password || balance === undefined) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const result = await registerUser(name, email, password, balance);
    res.status(result.success ? 200 : 400).json(result);
});

// **Login a user**
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const result = await loginUser(email, password);
    res.status(result.success ? 200 : 400).json(result);
});

// **Deposit API**
app.post('/api/deposit', async (req, res) => {
    const { userId, amount } = req.body;

    if (!userId || amount === undefined) {
        return res.status(400).json({ success: false, message: "User ID and amount are required" });
    }

    const result = await deposit(userId, amount);
    res.status(result.success ? 200 : 400).json(result);
});

// **Fetch All Users API**
app.get('/api/users', async (req, res) => {
    const result = await fetchAllUsers();
    res.status(result.success ? 200 : 500).json(result);
});

// **Start the Server**
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

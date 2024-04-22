const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

class AuthController {
    static async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        try {
            const user = await User.getByUsername(username);
            
            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            const token = jwt.sign({ id: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });
            res.json({ token, user });
        } catch (err) {
            console.error('Error logging in:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async register(req, res) {
        try {
            const { username, email, password, manageType } = req.body;
            const existingUser = await User.getByUsernameOrEmail(username, email);
            if (existingUser) {
                return res.status(400).json({ error: 'Username or email already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                username,
                email,
                password: hashedPassword,
                manageType
            };
            const createdUser = await User.create(newUser);
    
            res.status(201).json({ message: 'User registered successfully', user: createdUser });
        } catch (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = AuthController;

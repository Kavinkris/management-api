const User = require('../models/User');

class UserController {
    static async getUserByUsername(req, res) {
        try {
            console.log('Inside getUserByUsername method'); // Log to check method entry
            const { username } = req.params;
            console.log('Username:', username); // Log username parameter
            const user = await User.getByUsername(username);
            console.log('User:', user); // Log user data
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error('Error getting user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = UserController;

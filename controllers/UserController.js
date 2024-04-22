const User = require('../models/User');

class UserController {
    static async getUserByUsername(req, res) {
        try {
            const { id } = req.params;
            const user = await User.getByUsername(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error('Error getting user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getUserList(req, res) {
        try {
            const users = await User.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { username, email, password, manageType } = req.body;
            const updatedUser = await User.updateUser(userId, { username, email, password, manageType });
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } catch (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async addBlogContent(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
    
            const fileUrl = req.protocol + '://' + req.get('host') + '/' + req.file.path;
            const {BlogTitle , description, createdBy, blogStatus} = req.body;
            const createBlog = {
                BlogTitle,
                description,
                createdBy,
                blogStatus,
                fileUrl: fileUrl
            }
            await User.createBlog(createBlog);
            res.status(200).json({ message: 'Blog Created Successfully' });
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Duplicate entry. The Blog Title has already been added.' });
            } else {
                console.error('Error uploading file:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
    static async updateBlogContent(req, res) {
        try {
            const userId = req.params.id;
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
    
            const fileUrl = req.protocol + '://' + req.get('host') + '/' + req.file.path;
            const {BlogTitle , description, createdBy, blogStatus} = req.body;
            const createBlog = {
                BlogTitle,
                description,
                createdBy,
                blogStatus,
                fileUrl: fileUrl
            }
            await User.updateBlog(userId, createBlog);
            res.status(200).json({ message: 'Blog Created Successfully' });
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Duplicate entry. The Blog Title has already been added.' });
            } else {
                console.error('Error uploading file:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
    
}

module.exports = UserController;
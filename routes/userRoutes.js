const express = require('express');
const multer = require('multer');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');


const path = require('path');

// Define storage engine with custom filename and destination
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploads
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname); // Get the original file extension
        cb(null, uniqueSuffix + extension); // Unique filename with original extension
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Public routes
router.post('/login', AuthController.login);

// Public routes
router.post('/createUser', AuthController.register);

// Protected routes
router.get('/user/:id', authMiddleware.authenticateToken, UserController.getUserByUsername);

// User List routes
router.get('/usersList', authMiddleware.authenticateToken, UserController.getUserList);

// ubdate User List routes
router.put('/updateUser/:id', authMiddleware.authenticateToken, UserController.updateUser);

// website Blog Content upload
router.post('/addBlog', authMiddleware.authenticateToken, upload.single('file'), UserController.addBlogContent);

module.exports = router;

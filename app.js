const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

const rootPath = __dirname + '/uploads';
const cleanedRootPath = rootPath.replace(/ /g, '');

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(cleanedRootPath));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

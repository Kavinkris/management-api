const connection = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class User {
    static getByUsername(username) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
                if (err) {
                    console.error('Error getting user by username:', err);
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null); // User not found
                }
                resolve(results[0]);
            });
        });
    }
    static getByUsernameOrEmail(username, email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
                if (err) {
                    console.error('Error getting user by username or email:', err);
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }

    static create(newUser) {
        return new Promise((resolve, reject) => {
            const guid = uuidv4();
            newUser.guid = guid;
            connection.query('INSERT INTO users SET ?', newUser, (err, results) => {
                if (err) {
                    console.error('Error creating user:', err);
                    return reject(err);
                }
                resolve({ guid: guid, ...newUser });
            });
        });
    }
    
}

module.exports = User;

const connection = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class User {
    static getByUsername(username) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
                if (err) {
                    console.error('Error getting user by userid:', err);
                    return reject(err);
                }
                console.log(results)
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
    static createBlog(newBlog) {
        return new Promise((resolve, reject) => {
            const guid = uuidv4();
            newBlog.guid = guid;
            connection.query('INSERT INTO websitedomdata SET ?', newBlog, (err, results) => {
                if (err) {
                    console.error('Error creating Blog:', err);
                    return reject(err);
                }
                resolve({ guid: guid, ...newBlog });
            });
        });
    }
    static updateBlog(userId, newBlog) {
        return new Promise((resolve, reject) => {
            const guid = uuidv4();
            newBlog.guid = guid;
            connection.query('UPDATE websitedomdata SET ? WHERE id = ?', [newBlog, userId], (err, results) => {
                if (err) {
                    console.error('Error creating Blog:', err);
                    return reject(err);
                }
                resolve({ guid: guid, ...newBlog });
            });
        });
    }

    static updateFileUrl(userId, fileUrl) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET file_url = ? WHERE id = ?', [fileUrl, userId], (err, results) => {
                if (err) {
                    console.error('Error updating file URL:', err);
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static getAllUsers() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE guid!=''`, (err, results) => {
                if (err) {
                    console.error('Error updating file URL:', err);
                    return reject(err);
                }
                resolve(results);
            })
        })
    }

    static updateUser(userId, newData) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET ? WHERE userid = ?', [newData, userId], (err, results) => {
                if (err) {
                    console.error('Error updating user:', err);
                    return reject(err);
                }
                resolve({ id: userId, ...newData });
            });
        });
    }
    
}

module.exports = User;

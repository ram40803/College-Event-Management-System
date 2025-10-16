// db/mysql_pool.js - Configures and exports the MySQL connection pool
const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables from .env file

const dbConfig = {
    // Reading credentials from process.env
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root', 
    password: process.env.DB_PASSWORD || 'default_password', 
    database: process.env.DB_DATABASE || 'default_database', 
    
    // Standard pool settings
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create the connection pool
const pool = mysql.createPool(dbConfig);

// Test the connection on startup
pool.getConnection()
    .then(connection => {
        console.log('Successfully connected to MySQL database using .env credentials.');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to MySQL database. Please check your .env file and server status:', err.message);
        // Exit process if connection fails
        process.exit(1);
    });

module.exports = pool;

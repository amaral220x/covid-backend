import mysql from 'mysql';
import { password, user } from './login.js';

const connection = mysql.createConnection({
    host: 'localhost',
    user: user,
    password: password,
    database: 'covid',
});

export default connection;


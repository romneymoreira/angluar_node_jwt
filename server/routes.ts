import { TokenInterceptor } from './../src/app/auth/auth.interceptor';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as request from 'request';

// https://www.youtube.com/watch?v=Ad3fj9V7s6A
const app = express.Router();
export {app as routes};
app.get('/', (req, res) => res.send('Hello world'));

app.get('/posts', verifyToken, (req, res) => {
    jwt.verify(returnToken(req), 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                const parsedWeather = JSON.parse(body);
                res.json(parsedWeather);
            });
        }
    });
});

function returnToken(req) {
    const bearerHeader = req.headers.authorization;
    // checked
    if (typeof bearerHeader !== 'undefined') {
        // continue if bearer is not undefined
         const bearer = bearerHeader.split(' ');
         const bearerToken = bearer[1];
       return bearerToken;
    }
    return '';
}

app.get('/todos', verifyToken, (req, res) => {
    jwt.verify(returnToken(req), 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            request('https://jsonplaceholder.typicode.com/todos', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            const parsedWeather = JSON.parse(body);
            res.json(parsedWeather);
            });
        }
    });
});

app.post('users', verifyToken, (req, res) => {
    jwt.verify(req, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'ok',
                authData: authData
            });
        }
    });
});

app.post('/login', (req, res) => {
    const user = req.body;
    jwt.sign({user: user}, 'secretkey', {expiresIn: '1d'}, (err, token) => {
       res.json({
           token: token
       });
    });
});
// https://www.youtube.com/watch?v=7nafaH9SddU
// Autorization: Baerer <access_token>
// verify token
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // checked
    if (typeof bearerHeader !== 'undefined') {
        // continue if bearer is not undefined
         const bearer = bearerHeader.split(' ');
         const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

// https://jsonplaceholder.typicode.com/posts

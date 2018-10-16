import * as express from 'express';
import {routes} from './routes';

const app = express();

app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE, HEAD');
res.header('Access-Control-Allow-Credentials', 'true');
res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

app.use(express.json());
app.use('/', routes);

app.listen(9000, () => console.log('express server is running at port number 9000.'));

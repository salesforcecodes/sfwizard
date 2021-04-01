const express = require('express');
const app = express();
import cors from 'cors';
import api from './routes/index';

var allowlist = ['http://localhost:3000/', 'https://salesforcecodes.github.io/']
var corsOptions = {
    origin: (origin, callback) => {
        if (allowlist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', cors(corsOptions), api);
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Application is running on ', process.env.PORT || 3000);
});
const express = require('express');
const app = express();
import cors from 'cors';
import api from './routes/index';

var allowlist = ['http://localhost:3000/', 'https://salesforcecodes.github.io/']
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', cors(corsOptionsDelegate), api);
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Application is running on ', process.env.PORT || 3000);
});
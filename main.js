const express = require('express');
const app = express();
import cors from 'cors';
import api from './routes/index';

// var allowlist = ['http://localhost:3000/', 'http://localhost:4000/', 'https://salesforcecodes.github.io/']
// var corsOptionsDelegate = function (req, callback) {
//     var corsOptions;
//     if (allowlist.indexOf(req.header('Origin')) !== -1) {
//         corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//     } else {
//         corsOptions = { origin: false } // disable CORS for this request
//     }
//     callback(null, corsOptions) // callback expects two parameters: error and options
// }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', api);
app.use(express.static('public'));

app.listen(process.env.PORT || 4000, () => {
    console.log('Application is running on ', process.env.PORT || 4000);
});
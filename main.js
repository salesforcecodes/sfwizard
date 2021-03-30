const express = require('express');
const app = express();
import api from './routes/index';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', api);
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Application is running on ', process.env.PORT || 3000);
});
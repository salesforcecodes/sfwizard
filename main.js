const express = require('express');
const soap = require('soap');
const app = express();
import soapService from './services/soapService';

app.use(express.static('public'));

var xml = require('fs').readFileSync('./files/myService.wsdl', 'utf8');
app.listen(process.env.PORT || 3000, () => {
    console.log('Application is started');
    soap.listen(app, '/wsdl', soapService, xml, () => {
        console.log('server initialized');
    });
});
import express from 'express';
import jsforce from 'jsforce';
import fs from 'fs';

let bundles = [];
fs.readdir('./deploy', (err, files) => {
    files.forEach(file => {
        bundles.push(file.split('.')[0]);
    });
});

var router = express.Router();

router.get('/health', (req, res) => {
    res.json({ message: 'ok' });
});

router.post('/deploy/:bundle', (req, res) => {
    if (!req.body.token || !req.body.url) {
        res.status(400).json({ message: 'Please pass token and url' });
    } else if (!req.params.bundle || !bundles.includes(req.params.bundle)) {
        res.status(400).json({ message: 'Please pass a valid name of the bundle you want to deploy' });
    } else {
        try {
            let zipStream = fs.createReadStream(`./deploy/${req.params.bundle}.zip`);
            new jsforce.Connection({
                instanceUrl: req.body.url,
                accessToken: req.body.token
            })
                .metadata.deploy(zipStream, { singlePackage: true })
                .complete(function (err, result) {
                    if (err) { res.status(500).json({ message: err.message }) }
                    res.json(result);
                });
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
});

export default router;
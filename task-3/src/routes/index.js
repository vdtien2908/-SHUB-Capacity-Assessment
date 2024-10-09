'use strict';

const express = require('express');
const router = express.Router();

router.use('/v1/api', (req, res) => {
    res.send('Hello');
});

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();

const QueryController = require('../http/controllers/query.controller');
const asyncHandler = require('../helpers/asyncHandler');

router.use('/v1/api', asyncHandler(QueryController.handleGetData));

module.exports = router;

'use strict';
const express = require('express');
const route = express.Router();

const upload = require('../../http/middlewares/upload.middleware');

const ReportController = require('../../http/controllers/report.controller');
const asyncHandler = require('../../helpers/asyncHandler');

route.get('/reports', asyncHandler(ReportController.getReportData));
route.post(
    '/reports',
    upload.single('file'),
    asyncHandler(ReportController.uploadReport)
);

module.exports = route;

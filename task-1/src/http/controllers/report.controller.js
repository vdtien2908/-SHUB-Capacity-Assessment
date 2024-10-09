'use strict';

const { SuccessResponse } = require('../../core/success.response');
const ReportService = require('../../services/report.service');
const formatToVND = require('../../helpers/numberFormat');

class ReportController {
    // [POST] /v1/api/reports
    uploadReport = async (req, res) => {
        console.log(`Upload report:: ${req.file}`);
        new SuccessResponse({
            message: 'Upload file successfully!',
            metaData: await ReportService.uploadReport(req.file),
        }).send(res);
    };

    // [GET] /v1/api/reports
    getReportData = async (req, res) => {
        console.log(`Get report:: ${req.query}`);
        const totalAmount = await ReportService.getReport({
            startTime: req.query.startTime,
            endTime: req.query.endTime,
        });
        new SuccessResponse({
            message: 'Get report successfully!',
            metaData: formatToVND(totalAmount),
        }).send(res);
    };
}

module.exports = new ReportController();

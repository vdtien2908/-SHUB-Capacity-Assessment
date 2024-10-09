'use strict';

const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const { BadRequestError } = require('../core/error.response');

class ReportService {
    constructor() {
        this.lastUploadedData = [];
    }

    uploadReport = async (file) => {
        if (!file) {
            throw new BadRequestError('No file upload.');
        }

        // Read file Excel
        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert data
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Check file
        if (
            data[4].__EMPTY_1 !== 'Giờ' ||
            data[4].__EMPTY_7 !== 'Thành tiền (VNĐ)'
        ) {
            throw new BadRequestError('Wrong format file.');
        }

        // Save the most recent file
        this.lastUploadedData = data;

        return data;
    };

    getReport = async ({ startTime, endTime }) => {
        const uploadsDir = path.join(__dirname, '../../uploads/');
        const rowStartData = 5;
        const initValue = 0;
        let data = this.lastUploadedData;

        if (data.length === 0) {
            const latestFile = await new Promise((resolve, reject) => {
                fs.readdir(uploadsDir, (err, files) => {
                    if (err)
                        reject(new BadRequestError('Error reading directory'));

                    if (files.length === 0) {
                        reject(
                            new BadRequestError(
                                'No files found in uploads directory'
                            )
                        );
                    }

                    const sortedFiles = files
                        .map((file) => {
                            const filePath = path.join(uploadsDir, file);
                            const stats = fs.statSync(filePath);
                            return {
                                file,
                                ctime: stats.ctime,
                            };
                        })
                        .sort((a, b) => b.ctime - a.ctime);

                    resolve(sortedFiles[0]?.file);
                });
            });

            const workbook = xlsx.readFile(`${uploadsDir}${latestFile}`);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const dataNew = xlsx.utils.sheet_to_json(worksheet);
            data = dataNew;
        }

        if (!startTime || !endTime) {
            throw new BadRequestError('Missing input!');
        }

        const filteredData = data.slice(rowStartData).filter((record) => {
            const time = record.__EMPTY_1;
            return time >= startTime && time <= endTime;
        });

        const totalAmount = filteredData.reduce((total, record) => {
            return total + parseFloat(record.__EMPTY_7);
        }, initValue);

        return totalAmount;
    };
}

module.exports = new ReportService();

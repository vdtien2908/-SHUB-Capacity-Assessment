require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// Init middleware
app.use(morgan('dev')); // 'dev' is a predefined format
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Init routes
app.use('/', require('./routes'));

module.exports = app;

const express = require('express');
const path = require('path');
const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Path to Routes
const index = require('./routes/index');

const app = express();

const PORT = 3002;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


//module.exports = app;

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
})
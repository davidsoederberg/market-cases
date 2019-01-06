// Load env variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const debug = require('debug')('b-rscase:app.js');
const chalk = require('chalk');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cronAfterClose = require('./lib/cron/after-day');
const cronIntraday = require('./lib/cron/intraday');

const api = require('./router/routes/api');


if (process.env.NODE_ENV !== 'test') {
  // Connect to database
  mongoose.connect(process.env.DB, { useNewUrlParser: true, dbName: 'development' }).then(
    () => { debug(chalk.green('Database connection established')); },
    (err) => { debug(chalk.red(err)); },
  );
}

cronAfterClose.start();
cronIntraday.start();
debug(chalk.green('Cron services started'));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

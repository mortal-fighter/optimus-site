'use strict';

const express = require('express');
const app = express();
const config = require('./config/common');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// Prettyfing html output with indentation
app.locals.pretty = true;


app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
app.use(bodyParser.text());

app.use(cookieParser());

app.use(compression());

app.use(express.static('public'));
app.set('views', './view/');
app.set('view engine', 'pug');

app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/site'));

app.all('*', function(req, res, next) {
	res.render('site/page_not_found');
});

app.listen(config.app.port, (err) => {
    if (err) {
        console.log(`Error: couldn't start server: ${err.message} ${err.stack}`);
        return;
    }
    console.log(`Server is listening on port ${config.app.port}`);
});
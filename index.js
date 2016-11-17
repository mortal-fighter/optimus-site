'use strict';

const express = require('express');
const app = express();
const middleware = require('./middleware');
const config = require('./config/common');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// Prettyfing html output with indentation
if (config.app.mode === 'development') {
	app.locals.pretty = true;
}

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
app.use(bodyParser.text());

app.use(cookieParser());

// SITE
//todo: rewrite middlewares as routers
app.get('/', middleware.homePage);
app.get('/about', middleware.about);
app.get('/schedule', middleware.schedule);
app.get('/prices', middleware.prices);
app.get('/contacts', middleware.contacts);
//app.get('/infounits', middleware.infounits); //todo: remove it and it's files
app.get('/news', middleware.news);


// ADMIN
app.use('/admin', require('./routes/admin'));

// test
app.get('/login', middleware.login);
app.get('/restricted', middleware.restricted);
app.get('/bbtest', middleware.bbtest);



app.use(express.static('public'));
app.set('views', './view/');
app.set('view engine', 'pug');

app.all('*', middleware.pageNotFound);

app.listen(config.app.port, (err) => {
    if (err) {
        console.log(`Error: couldn't start server: ${err.message} ${err.stack}`);
        return;
    }
    console.log(`Server is listening on port ${config.app.port}`);
});
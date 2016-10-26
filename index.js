'use strict';

const express = require("express");
const app = express();
const middleware = require("./middleware");
const config = require("./config/common");

// Prettyfing html output with indentation
if (config.app.mode === "development") {
	app.locals.pretty = true;
}

app.get("/", middleware.homePage);
app.get("/about", middleware.about);
app.get("/schedule", middleware.schedule);
app.get("/prices", middleware.prices);
app.get("/contacts", middleware.contacts);

// test
app.get("/login", middleware.login);
app.get("/restricted", middleware.restricted);

app.use(express.static("public"));
app.set('views', "./view/");
app.set('view engine', 'pug');

app.all("*", middleware.pageNotFound);

app.listen(config.app.port, (err) => {
    if (err) {
        console.log(`Error: couldn't start server: ${err.message} ${err.stack}`);
        return;
    }
    console.log(`Server is listening on port ${config.app.port}`);
});
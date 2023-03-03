const express = require ("express");
const cookieParser = require ('cookie-parser');
const sequelize = require ("./config/database");
const routes = require ("./routes");

const port = 3001;
const app = express ();

app.use (express.json ());
app.use (cookieParser ())
app.use ("/api", routes);

sequelize.sync ().then (() => {

    app.listen (port, () => {

        console.log (`App listening on port ${port}.`);
    });
});
const express = require("express");
const morgan = require("morgan");
const passport = require('passport');
const swaggerMiddleware = require("../middlewares/swaggerMiddleware");
const { ErrorHandler, NotFoundError } = require("../middlewares/ErrorMiddleware");
const setupRoutes = require("./setupRoutes");
const setupPassport = require('../configs/setupPassport');

const setupMiddlewares = (app) => {
    app.use(express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use(passport.initialize());
    setupPassport(passport)
    swaggerMiddleware(app);

    setupRoutes(app)

    app.use(NotFoundError);
    app.use(ErrorHandler);
};

module.exports = setupMiddlewares  

require("dotenv").config();

const express = require("express");
const connectDB = require("./configs/db/db.mongodb");
const setupMiddlewares = require("./configs/setupMiddlewares");

const app = express();

connectDB();

setupMiddlewares(app)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server runnig on port ${port}`);
});

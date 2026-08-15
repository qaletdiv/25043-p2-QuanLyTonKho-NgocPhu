require("dotenv").config();

const express = require('express');
const cookieParser = require("cookie-parser")
const session = require('express-session');
const MySQLStrore = require('express-mysql-session')(session);
const app = express();
const config = require("./config//config");
const authRouth = require("./route/authRoute.js");
const requestLoggerMiddleware = require("./middleware/reqLogger.js")
const errorHandleMiddleware = require("./middleware/errorHandler.js")
const db = require("./model/index.js")
const port = process.env.PORT;


app.use(requestLoggerMiddleware)
app.use(express.json()); // convert body to json
app.use(cookieParser());
// route o day
app.use("/api/auth",authRouth);


app.use(errorHandleMiddleware)

db.sequelize.authenticate()
    .then(()=>{
        console.log("ket noi csdl thanh cong")
    })
    .catch(err =>{
        console.log("ko the ket noi csdl:",err)
    })

app.listen(port, ()=>{
    console.log(`server is listening at http://localhost:${port}`)
})
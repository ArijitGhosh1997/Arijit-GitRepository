//import packages
"use strict";
const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoute=require ("C:/Arijit/GitRepository/JS Project/routes/todoRoute");
const employeeRoute = require('./routes/employeeRoute');
const {connectDB} = require('./db/sqlDB');

var app = express();

app.use(
  bodyParser.urlencoded({
    extended: "true",
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
connectDB();
  
const portNo = 3000;
  app.listen(portNo, () => {
    console.log(`Server running at port ${portNo}`);
  });
  
app.use('/employee', employeeRoute);
app.use('/todo',todoRoute);


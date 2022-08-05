require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const Admin = require('./RoutesHandler/Admin');
const bodyParser = require("body-parser");
const cookie = require('cookie-parser');
const PORT =   process.env.PORT;
const databse_hostname = process.env.DATABASE_URL;
const hostname = "localhost";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(cookie());

// mongoose connectivity
mongoose.connect(databse_hostname)
.then(()=>console.log("mongoose connection successfully."))
.catch((err)=>console.log(err))




// routes defined
app.use('/',Admin)

app.listen(PORT,()=>{
    console.log(`Our server is running at http://${hostname}:${PORT}`)
})


const express = require("express");
const CheckLogin = require('../middlewars/CheckLogin')
const {Home,HomePost,ConsumerPost,FindActive,Signup,login} = require('../RoutesFunction/AdminFunction')
const Admin = express.Router();

Admin.get("/",CheckLogin,Home);

Admin.post("/",HomePost);

Admin.post("/consumer",ConsumerPost);

Admin.get ("/find-active",FindActive);

Admin.post("/signup",Signup);

Admin.post("/login",login)
module.exports = Admin;

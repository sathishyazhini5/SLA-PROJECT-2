const express = require("express");
const router = express.Router();
const auth = require("./auth");

const reg_functions = require('../controller/register/index')
const login_functions = require('../controller/login/index')

let routes = (app) => {

  router.get("/", function(req, res){
    res.send("Route hit")
  }); 

  //reg
  router.post('/reg',reg_functions.reg)
  router.post('/regagg',reg_functions.regagg)

  //login
  router.post('/login',login_functions.lg2)
  

  app.use("/api", router);
};

module.exports = routes;
const express = require("express");
const router = express.Router();
const auth = require("./auth");
const fun1=require('../controller/createentry/index')
const fun2=require('../controller/signin/index')

let routes = (app) => {

  router.get("/", function(req, res){
    res.send("Route hit")
  });
  router.post('/createsave',fun1.savedata)
  router.post('/find',fun1.findall)
  router.post('/login',fun2.login)
  app.use("/api", router);
};

module.exports = routes;
const express = require("express");
const router = express.Router();
const auth = require("./auth");

const reg_functions = require('../controller/Admin_register/index')
const login_functions = require('../controller/login/index')
const branch_functions = require('../controller/managebranch/index')
const promo_functions = require('../controller/promocode/index')
const enq_functions = require('../controller/enquiry/index')
const enroll_functions = require('../controller/enrollment/index')
const fee_functions = require('../controller/fees/index')
const stream_functions = require('../controller/stream/index')

let routes = (app) => {

  router.get("/", function(req, res){
    res.send("Route hit")
  }); 

  //Adminreg
  router.post('/reg',reg_functions.reg)
  router.post('/regagg',reg_functions.regagg)

  //Adminlogin
  router.post('/login',login_functions.lg)
  router.post('/login2',login_functions.lg2)

  //Admin-save-branch
  router.post('/savebranch',branch_functions.savebranch)
  router.post('/getbranch',branch_functions.allbranch)

  //Admin-promocode
  router.post('/savepromo',promo_functions.savepromo)
  router.post('/getpromo',promo_functions.getpromo)
  
  //enquiry
  router.post('/saveenq',enq_functions.saveneq)
  router.post('/getenq',enq_functions.getenq)

  //enrollment
  router.post('/save',enroll_functions.saveStudents)
  router.post('/getenroll',enroll_functions.getallenroll)
  router.post('/combinedata',enroll_functions.combinedata)

  router.post('/update',enroll_functions.upt)

  router.post('/reg',enroll_functions.reg)
  

  //fee
  router.post('/savefee',fee_functions.savefee)
  router.post('/getfee',fee_functions.getfee)
  router.post('/updatefee',fee_functions.updatefee)

  //Admin-stream
  router.post('/streamsave',stream_functions.streamsave)


  app.use("/api", router);
};

module.exports = routes;
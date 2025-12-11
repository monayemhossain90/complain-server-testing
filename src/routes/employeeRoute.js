const express =require('express');
const EmployeeController = require("../controllers/employee/EmployeeController");
const HistoryController = require("../controllers/history/HistoryController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const IsEmployee = require('../middlewares/IsEmployee');


const router = express.Router();

// get  pending complains that assigned to a employee
router.get("/getAllSelfComplains", AuthVerifyMiddleware, IsEmployee, EmployeeController.GetAllComplainsByEmployee);



// when employee update complain status, an sms will send to manager and a working history will create
 router.patch("/updateComplainStatus/:id", AuthVerifyMiddleware, IsEmployee, EmployeeController.UpdateComplainByEmployee);

//  get history by employee
router.get('/getHistory', AuthVerifyMiddleware, IsEmployee, HistoryController.GetEmployeeHistory);

module.exports=router;


const express =require('express');
const UserController = require("../controllers/user/UserController");
const ComplainController = require("../controllers/complain/ComplainController");
const HistoryController = require("../controllers/history/HistoryController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const IsAdmin = require("../middlewares/IsAdmin");


const router = express.Router();


// create employee or manager
router.post("/createUser", AuthVerifyMiddleware,IsAdmin, UserController.CreateUser);

// get all managers and employees 
router.get("/getAllUsers", AuthVerifyMiddleware, IsAdmin, UserController.GetAllUsers);


// update employee/manager by id
 router.patch("/updateUser/:id", AuthVerifyMiddleware, IsAdmin,UserController.UpdateUserById);

//  delete employee and manager
 router.delete("/deleteUser/:id", AuthVerifyMiddleware, IsAdmin, UserController.DeleteUserById);


// get all pending complains
router.get("/getAllPendingComplains", AuthVerifyMiddleware, IsAdmin, ComplainController.GetAllPendingComplains);

// get all completed complains
router.get("/getAllCompletedComplains", AuthVerifyMiddleware, IsAdmin, ComplainController.GetAllCompletedComplains);

// get all done complains
router.get("/getAllDoneComplains", AuthVerifyMiddleware, IsAdmin, ComplainController.GetAllDoneComplains);



 // update complain by id
 router.patch("/updateComplain/:id", AuthVerifyMiddleware, IsAdmin, ComplainController.UpdateComplainById);

// delete complain
 router.delete("/deleteComplain/:id", AuthVerifyMiddleware, IsAdmin, ComplainController.DeleteComplainById);

//  get all the all history

router.get('/getHistory', AuthVerifyMiddleware, IsAdmin, HistoryController.GetAdminHistory);

router.delete('/deleteHistory/:id', AuthVerifyMiddleware, IsAdmin, HistoryController.DeleteHistoryById);


module.exports = router;
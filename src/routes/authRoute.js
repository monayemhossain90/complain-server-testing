const express =require('express');
const router = express.Router();

const AuthController = require("../controllers/auth/AuthController");

// register
router.post("/register", AuthController.Register);


// admin login

router.post('/adminLogin',AuthController.AdminLogin);

// manager login

router.post('/managerLogin',AuthController.ManagerLogin);

// employee login

router.post('/employeeLogin',AuthController.EmployeeLogin);



module.exports = router;
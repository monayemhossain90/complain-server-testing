const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize")
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const dbConnect = require("./src/utility/dbConnect");
const authRouter = require("./src/routes/authRoute");
const adminRouter = require("./src/routes/adminRoute");
const employeeRouter = require("./src/routes/employeeRoute");
const managerRouter = require("./src/routes/managerRoute");



// MongoDB connection
dbConnect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("DB connection failed", err));


const app = express();


//Security Middleware Implementation
app.use(morgan("dev"));
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())



//RequestBodySizeIncrease//Body Parser Implementation
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));



//Request Rate Limit Implementation
const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000,   //10 Minutes
    max: 3000   //Limit each IP to 100 requests per windowMs
})
app.use(Limiter);



//MongoDB(mongoose) Atlas Database Connection
// dbConnect();


//Managing Back-end Routing// Back-end Routing Implementation
//app.use('/api/v1', router);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/manager', managerRouter);



//Testing-Route- HomPage
app.get('/', (req, res)=>{
    res.send('This is complain management server')
})



//Undefined Route
app.use('*',(req,res)=>{
    res.status(404).json({message:"Fail", data:"Route Not Found"});
});



module.exports = app;
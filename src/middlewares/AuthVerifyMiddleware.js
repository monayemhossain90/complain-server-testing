require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    let Token=req.headers['token'];
    jwt.verify(Token,process.env.SECRET_KEY,function (err,decoded) {
        if(err){
            res.status(401).json({message:"unauthorized", data: "Token is not valid"})
        }
        else {
            let data =decoded['data'];
            req.headers.phonenumber= data?.phonenumber;
            req.headers.id= data?.id;
            next()
        }
    })
}

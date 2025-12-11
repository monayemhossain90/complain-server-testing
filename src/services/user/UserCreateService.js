const hashedPassword = require("../../utility/hashedPassword");


const UserCreateService= async (req,res,DataModel) => {
   try{
      let reqBody=req.body;
      let existingPhonenumber = await DataModel.aggregate([{$match:{phonenumber: reqBody['phonenumber']}}]);

    
          if(existingPhonenumber.length ===0){
               reqBody.password = await hashedPassword(reqBody.password);//hashedPassword
               let data = await DataModel.create(reqBody)
               res.status(201).json({message: "success", data:data});
          }
          else{
            res.status(409).json({message: "Fail", data:"Phonenumber  Already Exist"}); //conflicting-request
          }
   }
   catch (error) {
      res.status(500).json({ message: "error", data:error.toString()});
   }
}

module.exports = UserCreateService;


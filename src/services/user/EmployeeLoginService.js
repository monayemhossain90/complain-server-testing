const CreateToken = require("../../utility/CreateToken");
const bcrypt = require("bcryptjs");

const EmployeeLoginService= async (req, res, DataModel) => {

    let phonenumber = req.body.phonenumber;
    let password = req.body.password;

    try {

        let findEmployee =await DataModel.aggregate([{$match:{phonenumber:phonenumber}}])

        if(findEmployee.length>0) {

            if(findEmployee[0].role !== "employee"){
                res.status(400).json({status:"fail", data:"You are not Employee"});
            }else{
                const CheckPassword = await bcrypt.compare(password, findEmployee[0].password);
                //if password is not matching
                if (!CheckPassword) {
                    res.status(400).json({message: "fail", data:"Wrong Password!"});
                }
                else{
                    let TokenData = {phonenumber: findEmployee[0].phonenumber, id: findEmployee[0]._id}
                    let token = await CreateToken(TokenData);
                    res.status(200).json({message:"success",token:token});
                }
            }
        } else {
            res.status(404).json({message: "fail", data:"Could not Find this phonenumber!"});
        }
    }
    catch (error) {
        res.status(500).json({ message: "error", data:error.toString()});
    }
}
module.exports= EmployeeLoginService
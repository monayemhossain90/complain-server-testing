const CreateToken = require("../../utility/CreateToken");
const bcrypt = require("bcryptjs");

const AdminLoginService= async (req, res, DataModel) => {

    let phonenumber = req.body.phonenumber;
    let password = req.body.password;

    try {

        let findAdmin =await DataModel.aggregate([{$match:{phonenumber:phonenumber}}])

        if(findAdmin.length>0) {

            if(findAdmin[0].role !== "admin"){
                res.status(400).json({status:"fail", data:"You are not Admin"});
            }else{
                const CheckPassword = await bcrypt.compare(password, findAdmin[0].password);
                //if password is not matching
                if (!CheckPassword) {
                    res.status(400).json({message: "fail", data:"Wrong Password!"});
                }
                else{
                    let TokenData = {phonenumber: findAdmin[0].phonenumber, id: findAdmin[0]._id}
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
module.exports=AdminLoginService
const CreateToken = require("../../utility/CreateToken");
const bcrypt = require("bcryptjs");

const ManagerLoginService= async (req, res, DataModel) => {

    let phonenumber = req.body.phonenumber;
    let password = req.body.password;

    try {

        let findManager =await DataModel.aggregate([{$match:{phonenumber:phonenumber}}])

        if(findManager.length>0) {

            if(findManager[0].role !== "manager"){
                res.status(400).json({status:"fail", data:"You are not Manager"});
            }else{
                const CheckPassword = await bcrypt.compare(password, findManager[0].password);
                //if password is not matching
                if (!CheckPassword) {
                    res.status(400).json({message: "fail", data:"Wrong Password!"});
                }
                else{
                    let TokenData = {phonenumber: findManager[0].phonenumber, id: findManager[0]._id}
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
module.exports= ManagerLoginService
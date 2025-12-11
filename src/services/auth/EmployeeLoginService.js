// const CreateToken = require("../../utility/CreateToken");
// const bcrypt = require("bcryptjs");

// const EmployeeLoginService= async (req, res, DataModel) => {

//     let phonenumber = req.body.phonenumber;
//     let password = req.body.password;

//     try {

//         let findEmployee =await DataModel.aggregate([{$match:{phonenumber:phonenumber}}])

//         if(findEmployee.length>0) {

//             if(findEmployee[0].role !== "employee"){
//                 res.status(400).json({status:"fail", data:"You are not Employee or partner"});
//             }else{
//                 const CheckPassword = await bcrypt.compare(password, findEmployee[0].password);
//                 //if password is not matching
//                 if (!CheckPassword) {
//                     res.status(400).json({message: "fail", data:"Wrong Password!"});
//                 }
//                 else{
//                     let TokenData = {phonenumber: findEmployee[0].phonenumber, id: findEmployee[0]._id}
//                     let token = await CreateToken(TokenData);
//                     res.status(200).json({message:"success",token:token});
//                 }
//             }
//         } else {
//             res.status(404).json({message: "fail", data:"Could not Find this phonenumber!"});
//         }
//     }
//     catch (error) {
//         res.status(500).json({ message: "error", data:error.toString()});
//     }
// }
// module.exports= EmployeeLoginService

const CreateToken = require("../../utility/CreateToken");
const bcrypt = require("bcryptjs");

const EmployeeLoginService = async (req, res, DataModel) => {
    const { phonenumber, password } = req.body;

    try {
        let findUser = await DataModel.aggregate([
            { $match: { phonenumber: phonenumber } }
        ]);

        if (findUser.length === 0) {
            return res.status(404).json({
                message: "fail",
                data: "Could not find this phone number!"
            });
        }

        const user = findUser[0];

        // Allow both employee and partner
        const allowedRoles = ["employee", "partner"];

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({
                status: "fail",
                data: "Access denied! You are not an employee or partner."
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "fail",
                data: "Wrong password!"
            });
        }

        // Generate token
        const token = await CreateToken({
            phonenumber: user.phonenumber,
            id: user._id,
            role: user.role
        });

        return res.status(200).json({
            message: "success",
            token: token
        });

    } catch (error) {
        return res.status(500).json({
            message: "error",
            data: error.toString()
        });
    }
};

module.exports = EmployeeLoginService;

const mongoose = require("mongoose");
const DeleteService= async (req,res, Model) => {
    try{

        let ID=req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let DeleteQueryObject = {_id: new ObjectId(ID)};

        let Delete =  await Model.deleteOne(DeleteQueryObject)
        res.status(204).json({message: "success", data: Delete});
    }
    catch (error) {
          res.status(500).json({message: "error", data: error.toString()});
    }
}
module.exports=DeleteService
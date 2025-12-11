const CreateService= async (req,res,DataModel) => {
    try{
        let PostBody = req.body;
        let data = await DataModel.create(PostBody)
        res.status(201).json({message: "success", data: data});
    }
    catch (error) {
        res.status(500).json({message: "error", data: error});
    }
}
module.exports=CreateService
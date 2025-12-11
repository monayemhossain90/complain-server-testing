const GetSortingByDateService = async (req, res, Model) => {
    try{

        const data = await Model.aggregate([
            {$sort : { createdAt: -1 }},
        ]);

        res.status(200).json({message: "success", data: data});
    }
    catch(error){
        res.status(500).json({message: "error", data: error.toString()});
    }
}


module.exports=GetSortingByDateService
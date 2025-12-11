const GetDoneComplainService = async (req, res, Model) => {
    try {
        const data = await Model.aggregate([
            // Match only documents with status "pending"
            { $match: { status: "done" } },
            // Sort by creation date descending
            { $sort: { createdAt: -1 } },
        ]);

        res.status(200).json({ message: "success", data: data });
    } catch (error) {
        res.status(500).json({ message: "error", data: error.toString() });
    }
}

module.exports = GetDoneComplainService;

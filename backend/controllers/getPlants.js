const Plant = require("../models/Plant");

const getPlants = async (req, res) => {
    try {
        const plants = await Plant.find({userId: req.user.id});

        res.status(200).json({
            success: true,
            plants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = getPlants;
const Plant = require("../models/Plant");

const deletePlant = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlant = await Plant.findByIdAndDelete(id);

    if (!deletedPlant) {
      return res.status(404).json({
        success: false,
        message: "Plant not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = deletePlant;

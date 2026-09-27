const Plant = require("../models/Plant")
const addPlant = async (req, res) => {
  try {
    const { plantName, species, location, water, userId } = req.body;
    const plant = await Plant.create({
      plantName,
      species,
      location,
      water,
      userId: req.user.id,
    });

    console.log("Plant added");

    res.status(201).json({
      message: "Plant added successfully",
      plant: {
        id: plant._id,
        plantName: plant.plantName,
        species: plant.species,
        location: plant.location,
        water: plant.water,
        userId : plant.userId
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "error adding plant",
      error: error.message,
    });
  }
};

module.exports = addPlant;

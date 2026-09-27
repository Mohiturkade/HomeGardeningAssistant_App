const mongoose = require("mongoose");
const User = require("./Users");

const plantsSchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: true,
  },

  species: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },
  water: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
})


const Plant = mongoose.model("Plant", plantsSchema);

module.exports = Plant;

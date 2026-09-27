const express = require("express");
const router = express.Router();
const addPlant = require("../controllers/addPlant");
const getPlants = require("../controllers/getPlants");
const deletePlant = require("../controllers/deletePlant")
const auth = require("../middlewares/auth")

router.post("/addPlant", auth , addPlant)
router.delete("/:id", auth , deletePlant)
router.get("/", auth , getPlants)
module.exports = router
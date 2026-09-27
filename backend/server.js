const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const userRoutes = require("./routes/user.routes");
const plantRoutes = require("./routes/plant.routes")
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ],
  credentials: true
}));

connectDB();

app.use("/users", userRoutes);
app.use("/plants", plantRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});

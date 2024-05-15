import express from "express";
import cors from "cors";
import menuRoutes from "./routes";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { url } from "./config/db.config";
import errorHandler from "./middleware/error-handler";

dotenv.config();

const app = express();

//hello

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

app.use(cors())

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my api." });
});

app.use(menuRoutes)

app.use(errorHandler)

// set port, listen for requests
const PORT = process.env.PORT || 3001;
const start = async () => {
  try {
    await mongoose.connect(url);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
  } catch (error) {
    console.error(error);
  }
};

start();
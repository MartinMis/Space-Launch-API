const express = require("express");
const cors = require("cors");

const api = require("./routes/api");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");
const { connectMongo } = require("./services/mongo");

const app = express();

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/", api);

app.listen(process.env.PORT, async () => {
  await connectMongo();
  await loadPlanetsData();
  await loadLaunchData();
  console.log(`Server listening on port ${process.env.PORT}`);
});

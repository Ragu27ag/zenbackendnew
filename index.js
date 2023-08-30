import express from "express";
import client from "./DB/db-client.js";
import cors from "cors";
import datarouter from "./Routes/DataRoute.js";
import userrouter from "./Routes/userroute.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

client.connect();

app.get("/health", (req, res) => {
  res.send({ msg: "backend up and running" });
});

app.use("/", datarouter);
app.use("/users", userrouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

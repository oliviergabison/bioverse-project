import express from 'express';
const { createPool, sql } = require("@vercel/postgres");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");


require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

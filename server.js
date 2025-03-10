const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT;

const app = express();
// app.use(express.json());
// const port = process.env.APP_PORT || 3000;

// Connect to mongodb
const {MONGO_PROTOCOL, MONGO_HOST, MONGO_PORT, MONGO_DB} = process.env;
const MongoUrl = `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

mongoose
    .connect(MongoUrl)
    .then(() => {console.log('Connected to mongodb')})
    .catch((error) => {console.error(error)});


app.get("/", (req, res) => {
  res.send("Hello, Docker!");
});

app.listen(3000, () => console.log(`Server running on port ${port}`));
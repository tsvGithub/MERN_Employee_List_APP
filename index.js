const express = require("express");
const mongoose = require("mongoose");
//body-parser takes the JSON that sent from the
//client to the server & parses it
const bodyParser = require("body-parser");

const app = express();
//for express to use body-parser
app.use(bodyParser.json());

//routes
const employee = require("./routes/employee");
//for express app to use route
app.use("/employee", employee);
//----------------------------------------
//MongoDB Atlass connection
mongoose
  .connect("mongodb+srv://only4Me:only4MeDB@cluster0-ztzuu.mongodb.net/mernstack?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.log("ERROR", err.message);
  });

//----------------------------------------

//first for deploying; second for developing
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

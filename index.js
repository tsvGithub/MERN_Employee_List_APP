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

//-------------------------------
//Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const uri = process.env.mongodb || "mongodb://localhost:27017/mernstack";
//-----------------------------------------
mongoose
  //connect to local DB with name 'mernstack'
  // .connect("mongodb://localhost:27017/mernstack",
  //or connect to MongoDb Atlas
  // .connect("mongodb+srv://only4Me:only4MeDB@cluster0-ztzuu.mongodb.net/mernstack?retryWrites=true&w=majority", {
  .connect(uri, {
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
// Step 3
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//first for deploying; second for developing
const PORT = process.env.PORT || 5000;
// const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

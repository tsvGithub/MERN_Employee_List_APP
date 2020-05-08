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
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }
// const uri = process.env.mongodb || "mongodb://localhost:27017/mernstack";

const dbAtlas = "mongodb+srv://only4Me:only4MeDB@cluster0-ztzuu.mongodb.net/test?retryWrites=true&w=majority";
const uri = dbAtlas || "mongodb://localhost:27017/mernstack";

//------------------------------
//connect to DB with name 'mernstack'
// mongoose.connect(
//   "mongodb://localhost:27017/mernstack",
//   {
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      //if error => terminates app
      process.exit(1);
      console.log("unable to connect to database");
    } else console.log("successfully connected to the database");
  }
);
//first for deploying; second for developing
const port = process.env.PORT || 5000;
// const port = 5000;
app.listen(port, () => {
  console.log("app is running on port 5000");
});

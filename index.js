const express = require("express");
const mongoose = require("mongoose");
//body-parser takes the JSON that sent from the
//client to the server & parses it
const bodyParser = require("body-parser");
//create express app
const app = express();
//for express to use the body-parser
//bodyParser module takes JSON that sent from the client
//to the server and it's gonna parse it for us
app.use(bodyParser.json());

// 1 ROUTES
//see in folder 'routes' file 'employee.js'
const employee = require("./routes/employee");
//for express app to use  const'employee' (routes)
app.use("/employee", employee);

//-------------------------------
//Deployment

//NB! If we're not in prodaction, so we're in development

// 1 to test what enviroment that we're at
//if we're in a prodaction enviroment run this code:
if (process.env.NODE_ENV === "production") {
  //that means we're hosted on Heroku/other hosting
  //first - tell express where our static files are located
  //When we run "npm run build" within our client directory
  //it is going to create a folder "build" within our client
  //where static files are going to be located
  app.use(express.static("client/build"));
  //2 serve react app
  //* === all
  //any get request send our react app to the user
  app.get("*", (req, res) => {
    //3 send our react app
    //define the path - use path module & join
    //directory name, go inside "client" folder=>inside 'build'
    //folder & there is index.html
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
//otherwise => don't run the code above for development
//----------------------------------------
//MongoDB Atlas
//4 mongodb is env.var for Heroku
//check to see if there's an env.var. "mongodb"
//if there isn't "mongodb"that means we're developing locally
//and need to use "mongodb://localhost:27017/mernstack"
const uri = process.env.mongodb || "mongodb://localhost:27017/mernstack";
//-----------------------------------------
mongoose
  //2 connect to local DB with name 'mernstack'
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
// 3 const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

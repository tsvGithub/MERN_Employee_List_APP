const express = require("express");
const employeeRouter = express.Router();
//Employee Model from Schema
const Employee = require("../model/Employee");

//NB Employee === Employee Model (Schema)

//CRUD = CreateReadUpdateDelete
//Read to return all the employee from collection
employeeRouter.get("/", (req, res) => {
  //Employee === Employee Model
  // {} => find all items from collection
  Employee.find({}, (err, response) => {
    if (err)
      //500 - something went wrong
      res.status(500).json({
        //create Message Object
        //for react Message Component
        message: {
          msgBody: "Unable to get employees",
          msgError: true,
        },
      });
    //retrieve all items from collection
    else {
      res.status(200).json({ response });
    }
  });
});

//Create
//recieve the data from the client side
employeeRouter.post("/", (req, res) => {
  //req.body = as we recieve data from client
  //new instance of the Employee Model will create DOCUMENT
  const employee = new Employee(req.body);
  //with this document will save to the DB
  employee.save((err, document) => {
    if (err)
      //500 - something went wrong
      res.status(500).json({
        //create Message Object
        //for react Message Component
        message: {
          msgBody: "Unable to add employee",
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: "Successfully Added Employee",
          //msgError false since everything went according to plan
          msgError: false,
        },
      });
  });
});

//Delete
//id=> primary key of item that will be deleted
employeeRouter.delete("/:id", (req, res) => {
  //Emloyee === Employee Model
  //req.params.id = gets id from the client
  Employee.findByIdAndDelete(req.params.id, (err) => {
    if (err)
      //500 - something went wrong
      res.status(500).json({
        //create Message Object
        //for react Message Component
        message: {
          msgBody: "Unable to Delete Employee",
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: "Successfully Deleted Employee",
          //msgError false since everything went according to plan
          msgError: false,
        },
      });
  });
});

//Update
//recieve the data from the client side
employeeRouter.put("/:id", (req, res) => {
  //Employee === Employee Model
  //{ _id: req.params.id } => which item to update
  //req.body => document to update from the user
  //{ runValidators: true } => mongose by default runs validators for all requests, except UPDATE, so need to be set to TRUE
  Employee.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true }, (err, response) => {
    if (err)
      //500 - something went wrong
      res.status(500).json({
        //create Message Object
        //for react Message Component
        message: {
          msgBody: "Unable to Update Employee",
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: "Successfully Updated Employee",
          //msgError false since everything went according to plan
          msgError: false,
        },
      });
  });
});

module.exports = employeeRouter;
//export for index.js can use it

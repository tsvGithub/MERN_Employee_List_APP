const express = require("express");
const employeeRouter = express.Router();
//Rmployee Model Schema
const Employee = require("../model/Employee");

//NB Employee === Employee Model (Schema)

//CreateReadUpdateDelete
//read
employeeRouter.get("/", (req, res) => {
  //Employee ===Employee Model
  // {} => find all items from collection
  Employee.find({}, (err, response) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to get employees",
          msgError: true,
        },
      });
    //retriev all items from collection
    else {
      res.status(200).json({ response });
    }
  });
});

//create
employeeRouter.post("/", (req, res) => {
  //new instance of the Model will create DOCUMENT
  const employee = new Employee(req.body);
  //with this document will save to the DB
  employee.save((err, document) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to add employee",
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: "Successfully Added Employee",
          msgError: false,
        },
      });
  });
});
//delete
//id=> primary key of item that will be deleted
employeeRouter.delete("/:id", (req, res) => {
  //Emloyee === Employee Model
  Employee.findByIdAndDelete(req.params.id, (err) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to Delete Employee",
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: "Successfully Deleted Employee",
          msgError: false,
        },
      });
  });
});
//update
//
employeeRouter.put("/:id", (req, res) => {
  //Employee === Employee Model
  //{ _id: req.params.id } => which item to update
  //req.body => document to update from the user
  //{ runValidators: true } => mongose by default runs validators for all requests, except UPDATE, so need to be set to TRUE
  Employee.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true }, (err, response) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to Update Employee",
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: "Successfully Updated Employee",
          msgError: false,
        },
      });
  });
});

module.exports = employeeRouter;
//export for index.js can use it

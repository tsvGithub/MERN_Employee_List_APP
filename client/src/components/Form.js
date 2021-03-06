import React from "react";
import Input from "./Input";
//
const Form = (props) => {
  return (
    //onSubmit Handler
    <form onSubmit={props.handler}>
      {/*h4 is based on state of Form: Edit or Create? 
        if it is isEditForm true?  => Editing Employee; 
        if it's false => Add Employee*/}
      <h4>{props.isEditForm ? "Editing Employee: " : "Add Employee: "}</h4>
      <div className="form-group">
        {/*Call Input Component with props: */}
        {/*handleChange func executes when user types inside Input */}
        {/*initial value */}
        <Input
          name="firstName"
          placeholder="Enter First Name"
          labelName="First Name: "
          handleChange={props.handleChange}
          value={props.employee.firstName}
        />
        <Input
          name="lastName"
          placeholder="Enter Last Name"
          labelName="Last Name: "
          handleChange={props.handleChange}
          value={props.employee.lastName}
        />
        <Input
          name="job"
          placeholder="Enter Job"
          labelName="Job: "
          handleChange={props.handleChange}
          value={props.employee.job}
        />
        <Input
          name="salary"
          placeholder="Enter Salary"
          labelName="Salary: "
          handleChange={props.handleChange}
          value={props.employee.salary}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;

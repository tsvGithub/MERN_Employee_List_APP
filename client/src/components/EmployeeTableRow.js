import React from "react";
const EmployeeTableRow = (props) => {
  //destructing  an 'employee' object:
  //{firstName, lastName, job, salary, _id}
  //
  //Destructuring позволяет быстрее получать (выбирать)
  //определённые значения из массивов и Objects.
  const { firstName, lastName, job, salary, _id } = props.employee;
  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{job}</td>
      <td>{salary}</td>
      {/*Edit button: 
      ShowEditForm handler as 
      onClick event & bind to .this; 
      + employee Object we want to edit*/}
      <td>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" onClick={props.showEditForm.bind(this, props.employee)} className="btn btn-secondary">
            Edit
          </button>
          <button type="button" onClick={props.deleteHandler.bind(this, _id)} className="btn btn-danger">
            Delete
          </button>
        </div>
      </td>{" "}
      {/*Delete by id button:
       deleteHandler as onClick
      event & bind to this
      + id we want to delete*/}
    </tr>
  );
};

export default EmployeeTableRow;

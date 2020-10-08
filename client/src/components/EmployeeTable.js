import React from "react";
import EmployeeTableRow from "./EmployeeTableRow";

//functional Component EmployeeTable
const EmployeeTable = (props) => {
  //<th> scope используется для программ чтения с экрана. col: указывает, что ячейка заголовка используется для столбца.
  // debugger;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Job Title</th>
          <th scope="col">Salary</th>
        </tr>
      </thead>
      <tbody>
        {props.employees.map((employee) => {
          return (
            <EmployeeTableRow
              key={employee._id}
              employee={employee}
              deleteHandler={props.deleteHandler}
              showEditForm={props.showEditForm}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default EmployeeTable;

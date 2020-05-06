import React from "react";
import EmployeeTableRow from "./EmployeeTableRow";

//functional Component EmployeeTable
const EmployeeTable = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {/*<th> scope используется для программ чтения с экрана. col: указывает, что ячейка заголовка используется для столбца. */}
          <th scope="col">ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Job Title</th>
          <th scope="col">Salary</th>
        </tr>
      </thead>
      <tbody>
        {/*For EmployeTableRow Component */}
        {/* map => создавать новые массивы, трансформировать данные в массиве и, соответственно, как результат, заносить их в новыю переменную. */}
        {props.employees.map((employee) => {
          return (
            //props:
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

//All HTTP requests
export default {
  //------------------------------
  //READ === get
  //first function returns every single item within collection
  getEmployees: () => {
    //returns a promise & it will be used within Components
    return (
      //request:
      //for backend index.js app.use('/employee', employee);
      //endpoint is '/employee'
      fetch("/employee")
        //response:
        //return & parse response;
        .then((res) => res.json())
        //get & return the data
        .then((data) => data)
    );
  },
  //--------------------------------
  //DELETE
  //as an argument is _id of deleting document within DB
  deleteEmployee: (_id) => {
    //endpoint is /employee/:id === id that argument
    //& request is method 'delete'
    return (
      //request:    where to?       what?
      fetch(`/employee/${_id}`, { method: "delete" })
        //response:
        //return & parse response;
        .then((res) => res.json())
        //get & return the data
        //'data' is a 'message' from routes>employee.js
        //"Unable to delete" or 'Successefully deleted'
        .then((data) => data)
      // .then((data) => console.log(data))
    );
  },
  //---------------------------
  //Update
  //employee we want to update within DB
  updateEmployee: (employee) => {
    //request body => pass JSON back to the server
    //need to stringify the 'employee' that passed in
    //option headers to let server know of sending back JSON
    return (
      //request
      //endpoint: employee/:id
      fetch(`/employee/${employee._id}`, {
        method: "put",
        body: JSON.stringify(employee),
        headers: {
          "Content-Type": "application/json",
        },
      })
        //response
        //return & parse response;
        //get the data to return
        .then((res) => res.json())
        .then((data) => data)
    );
  },
  //-------------------------------
  //CREATE
  //employee we want to create within DB
  createEmployee: (employee) => {
    //endpoint '/employee'
    //request body => pass JSON back to the server
    //need to stringify the 'employee' that passed in
    //option headers to let server know of sending back JSON
    return (
      //request:
      fetch(`/employee`, {
        method: "post",
        body: JSON.stringify(employee),
        headers: {
          "Content-Type": "application/json",
        },
      })
        //response:
        //return & parse response;
        //get the data to return
        .then((res) => res.json())
        .then((data) => data)
    );
  },
};

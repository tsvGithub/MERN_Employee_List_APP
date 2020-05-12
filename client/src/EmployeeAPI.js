//All HTTP requests
export default {
  //------------------------------
  //READ === get
  //first function returns every single item within collection
  getEmployees: () => {
    //returns a promise & it will be used within Components
    //return fetch& with endpoint we looking for is'employee'
    //***fetch это аналог ajax, который делает асинхронный запрос
    //и возвращает промис, поэтому обращаемся к методу .then и
    //получаем некоторый respose и далее, чтобы получить тот json,
    //который прилетает к нам с сервера, мы у объекта respose
    //должны вызвать метод json, который присутствует в методе fetch.
    return (
      //for backend index.js app.use('/employee', employee);
      fetch("/employee")
        //return & parse response; .json returning promise
        .then((res) => res.json())
        //get & return the data
        .then((data) => data)
    );
  },
  //--------------------------------
  //DELETE
  //as an argument is _id of deleting document
  deleteEmployee: (_id) => {
    //endpoint is /employee/+id === that argument
    //& request is method 'delete'
    return (
      fetch(`/employee/${_id}`, { method: "delete" })
        //return & parse response; .json returning promise
        .then((res) => res.json())
        .then((data) => data)
    );
  },
  //---------------------------
  //Update
  //employee Object as an argument to update
  updateEmployee: (employee) => {
    //employee as an argument + ._id
    //request is PUT==update
    //request body => pass JSON back to the server & need to stringify that passed in
    //option headers to let server know of sending back JSON
    return (
      fetch(`/employee/${employee._id}`, {
        method: "put",
        body: JSON.stringify(employee),
        headers: {
          "Content-Type": "application/json",
        },
      })
        //return & parse response; .json returning promise
        .then((res) => res.json())
        .then((data) => data)
    );
  },
  //-------------------------------
  //CREATE
  //employee Object as an argument to create within DB
  createEmployee: (employee) => {
    //endpoint '/employee'
    //post == create
    //filing in request body
    //headers for sending back JSON
    return (
      fetch(`/employee`, {
        method: "post",
        body: JSON.stringify(employee),
        headers: {
          "Content-Type": "application/json",
        },
      })
        //return & parse response; .json returning promise
        .then((res) => res.json())
        .then((data) => data)
    );
  },
};

import React from "react";
import EmployeeTable from "./components/EmployeeTable";
import Form from "./components/Form";
import Message from "./components/Message";
import EmployeeAPI from "./EmployeeAPI";

//
class App extends React.Component {
  constructor(props) {
    // debugger;
    //let use .this keyword within constructor
    super(props);
    //set STATE
    this.state = {
      //empty array for future items
      employees: [],
      //isEditForm has 2 states: Edit & Add
      //now Edit==false => Add Form
      isEditForm: false,
      //employee Object is used in Form to listen
      //for Change & update these properties
      employee: {
        firstName: "",
        lastName: "",
        salary: "",
        job: "",
      },
      //for Message Component
      message: "",
    };
    //---------------------------------
    //binding all of functions for child components
    //Bind() меняет context Object'a
    this.deleteHandler = this.deleteHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    //used within Form & going to manipulate with employee Object
    //from STATE. It listens for change & update employee Object
    this.handleChange = this.handleChange.bind(this);
    //set Form to edit & change isEditForm from State to 'true'
    this.showEditForm = this.showEditForm.bind(this);
  }
  //-------------------------------------------
  //executes once when Component initially renders
  //After initially render the DOM is loaded
  //& set the STATE of employees (empty) array
  //& trigger a rerender once is called setState
  componentDidMount() {
    // debugger;
    //use EmployeeAPI.js (all HTTP requests)
    //request:
    //get all employees from DB collection
    //respose:
    //.then get back (response) data from server
    //and setState of 'employees' with data.response
    EmployeeAPI.getEmployees().then((data) => {
      // console.log(data);
      //set state of employees
      this.setState({ employees: data.response });
    });
  }
  //----------------------------------------
  //func resetForm sets employee Object to initial
  resetForm() {
    this.setState({
      employee: {
        firstName: "",
        lastName: "",
        salary: "",
        job: "",
      },
    });
  }
  //---------------------------------------------
  //handler func gets event & updates employee Object
  handleChange(e) {
    //update employee Object
    this.setState({
      //employee will be set to this:
      employee: {
        //...spred operator разворачивает массивы и объекты и
        //служит, в основном, для создания новых массивов и
        //объектов. Или для трансформации их в какие-то
        //более удобные типы данных.
        ...this.state.employee,
        //target whatever is being changed.
        //Form has fields & each field has its own name attribute:
        //firsName, lastName, salary & job
        //for dynamic change targets by the name &
        //set it to the new value that's being typed in
        [e.target.name]: e.target.value,
      },
    });
  }
  //--------------------------------
  //UPDATE
  //showEditForm will be passed down as
  //a props to Form(.js)Component & Form Component
  //is going to pass in the employee Object that we want to edit.
  //
  //showEditForm takes in the employee Object
  showEditForm(employee) {
    //set the State of isEditForm to 'true'
    //=>sets Form to Edit Form
    //set employee Object to the employee being
    //passed in as an argument
    this.setState({ isEditForm: true, employee: employee });
  }
  //------------------------------------------
  //DELETE
  //id of item for deleting
  async deleteHandler(id) {
    //from HTTP request EmployeeAPI delete method
    //get response from server (routes>employee.js)
    //save response as 'deleteData'
    // deleteData is object:
    // message: {msgBody: "Successfully Deleted Employee", msgError: false}
    const deleteData = await EmployeeAPI.deleteEmployee(id);
    // console.log(deleteData);

    //get message back .message => defined in STATE
    const message = deleteData.message;
    // console.log(message);
    //message => {msgBody: "Successfully Deleted Employee", msgError: false}

    //depending on the message that we get
    //if msgError true or false (from server)
    if (message.msgError) {
      //if true => something went wrong
      //update Message Component with the error message
      this.setState({ message });
    } else {
      //if false => OK
      //get employees object
      const data = await EmployeeAPI.getEmployees();
      //updates State (message+employees object) & Message Component & Employees table
      this.setState({ message, employees: data.response });
    }
  }
  //----------------------------------------
  //UPDATE
  //updateHandler passed through Form
  //& 'll be executed as onSubmit func
  // takes an event as an argument
  async updateHandler(e) {
    e.preventDefault();
    //employee for update
    const updateData = await EmployeeAPI.updateEmployee(this.state.employee);
    const message = updateData.message;
    if (message.msgError) {
      this.setState({ message });
    } else {
      const data = await EmployeeAPI.getEmployees();
      this.setState({ message, employees: data.response });
    }
    //reset the Form to the previous state (false)
    this.setState({ isEditForm: false });
    //reset the Form itself
    this.resetForm();
  }
  //---------------------------------------------
  //CREATE
  //addHandler will passed to Form Component
  //& used as an OnSubmit func
  async addHandler(e) {
    e.preventDefault();
    //pass in the employee object to create
    const postData = await EmployeeAPI.createEmployee(this.state.employee);
    const message = postData.message;
    if (message.msgError) {
      this.setState({ message });
    } else {
      const data = await EmployeeAPI.getEmployees();
      this.setState({ message, employees: data.response });
    }
    //reset the Form itself
    this.resetForm();
  }
  //-------------------------------------------------
  //============================
  //EMPLOYEE TABLE COMPONENT
  //will execute only if there are items in collection DB
  renderEmployeeTable() {
    // debugger;
    if (this.state.employees.length > 0) {
      return (
        <EmployeeTable
          employees={this.state.employees}
          deleteHandler={this.deleteHandler}
          showEditForm={this.showEditForm}
        />
      );
    } //if 0 in collection => will return null & not render
    return null;
  }
  //-----------------------------------
  //FORM Component
  renderForm() {
    //props:
    //Form to know if is EDIT or ADD mode
    //employee Object is used for whenever we type into Form
    //a listener to listen whenever the user types into Form
    //& employee will be updated
    //handler takes onSubmit func
    //as Form has 2 states (Edit From & Create Form)
    //handler checks the state of Form (Edit or Create?)
    //if the State not equal to Edit Form => so
    //HANDLER is an Add Form, otherwise HANDLER is updateHandler(Edit Form)

    return (
      <Form
        isEditForm={this.state.isEditForm}
        employee={this.state.employee}
        handleChange={this.handleChange}
        handler={!this.state.isEditForm ? this.addHandler : this.updateHandler}
      />
    );
  } //--------------------------------------------
  //MESSAGE Component
  renderMessage() {
    //check if the message is empty => returns null => won't render Component
    if (this.state.message === "") return null;
    //if message not empty, returns Message Component
    //& pass in message as a prop
    return <Message message={this.state.message} />;
  }

  //------------------------------------
  //========================================
  //--------------------------------------
  //Main Render func for APP Component
  render() {
    // debugger;
    return (
      <div className="row">
        {/*row with 3 columns */}
        <div className="col"></div>
        {/* col-10 => middle size column*/}
        {/*calls Render functions */}
        <div className="col-10">
          {this.renderEmployeeTable()}
          {this.renderForm()}
          {this.renderMessage()}
        </div>
        <div className="col"></div>
      </div>
    );
  }
}

export default App;

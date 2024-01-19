// import Model Employee
const Employee = require("../models/Employee");

// buat class EmployeeController
class EmployeeController {
  // method index
  async index(req, res) {
    // memanggil method static all with async await
    const employees = await Employee.all();
    // if the data is more than 0
    if (employees) {
      const data = {
        message: "Get All Employees",
        data: employees,
      };
      // response status code 200 and json data
      res.status(200).json(data);
    } else {
      const data = {
        message: "Data is empty",
      };
      // response status code 200 and json data
      return res.status(200).json(data);
    }
  }
  // method store
  async store(req, res) {
    // validate date
    // handle If one of the data is not sent
    // get method create dari Model Employee

    // destruting object req.body
    const { name, gender, phone, address, email, status, hired_on } = req.body;
    // If the data is undefined then send an error response
    if (
      !name ||
      !gender ||
      !phone ||
      !address ||
      !email ||
      !status ||
      !hired_on
    ) {
      const data = {
        message: "All fields must be filled correctly",
      };
      // response status code 422 and json data
      res.status(422).json(data);
    }
    const employee = await Employee.create(req.body);
    const data = {
      message: "Employees is added successfully",
      data: employee,
    };
    // response status code 201 and json data
    res.status(201).json(data);
  }
  // method update
  async update(req, res) {
    const { id } = req.params;
    // look for the Employee id you want to update
    const employee = await Employee.find(id);
    if (employee) {
      // update data
      const employee = await Employee.update(id, req.body);
      const data = {
        message: "Employees is update successfully",
        data: employee,
      };
      // response status code 200 and json data
      res.status(200).json(data);
    } else {
      const data = {
        message: "Employees not found",
      };
      // response status code 404 and json data
      res.status(404).json(data);
    }
  }
  // method destroy
  async destroy(req, res) {
    const { id } = req.params;
    const employee = await Employee.find(id);
    if (employee) {
      await Employee.delete(id);
      const data = {
        message: "Employees is delete successfully",
      };
      // response status code 200 and json data
      res.status(200).json(data);
    } else {
      const data = {
        message: "Employees not found",
      };
      // response status code 404 and json data
      res.status(404).json(data);
    }
  }
  // method show
  async show(req, res) {
    const { id } = req.params;
    // search Employee by id
    const employee = await Employee.find(id);
    if (employee) {
      const data = {
        message: "Get Detail Employees",
        data: employee,
      };
      // response status code 200 and json data
      res.status(200).json(data);
    } else {
      const data = {
        message: "Employees not found",
      };
      // response status code 404 and json data
      res.status(404).json(data);
    }
  }
  // method search name
  async search(req, res) {
    const { name } = req.params;
    const employee = await Employee.search(name);
    // if data by name exists then display it
    if (employee) {
      const data = {
        message: "Get searched Employees",
        data: employee,
      };
      // response status code 200 and json data
      res.status(200).json(data);
    } else {
      const data = {
        message: "Employees not found",
      };
      // response status code 404 and json data
      res.status(404).json(data);
    }
  }
  // method check active data
  async active(req, res) {
    const employee = await Employee.findByStatus("active");
    const total = employee.length;
    if (employee) {
      const data = {
        message: "Get active employees",
        total: total,
        data: employee,
      };
      // response status code 404 and json data
      res.status(200).json(data);
    } else {
      const data = {
        message: "Employees not found",
      };
      // response status code 404 and json data
      res.status(404).json(data);
    }
  }
  // method check inactive data
  async inactive(req, res) {
    const employee = await Employee.findByStatus("inactive");
    const total = employee.length;
    if (employee) {
      const data = {
        message: "Get inactive employee",
        total: total,
        data: employee,
      };
      // response status code 200 and json data
      res.status(200).json(data);
    } else {
      const data = {
        message: "Employees not found",
      };
      // response status code 404 and json data
      res.status(404).json(data);
    }
  }

  // method check terminated data
  async terminated(req, res) {
    const employee = await Employee.findByStatus("terminated");
    const total = employee.length;
    if (employee) {
      const data = {
        message: "Get terminated employees",
        total: total,
        data: employee,
      };

      // response status code 200 and json data
      res.status(200).json(data);
    } else {
      const data = {
        message: "Employees not found",
      };

      // response status code 404 and json data
      res.status(404).json(data);
    }
  }
}

// membuat object EmployeeController
const object = new EmployeeController();

// export object EmployeeController
module.exports = object;
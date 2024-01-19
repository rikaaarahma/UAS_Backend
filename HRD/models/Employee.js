// import database
const db = require("../config/database");
// membuat class Employee
class Employee {
// get all
static all(){
  return new Promise((resolve, reject) =>{
    const query = "SELECT * FROM employees";
      db.query(query, (err, results) => {
        resolve(results);
        });
    });
}
// create data
static async create(data){
  const id = await new Promise((resolve, reject) =>{
      const sql = "INSERT INTO employees SET ?";
      db.query(sql, data, (err, results) =>{
          resolve(results.insertId);
      });
  });
  const employee = this.find(id);
  return employee;
}
// find id data 
static find(id){
  return new Promise((resolve, reject) =>{
      const sql = "SELECT * FROM employees WHERE id = ?";
      db.query(sql, id, (err, results) =>{
          //destructing array
          const [employee] = results;
          resolve(employee);
      });
  });
}
// update data
static async update(id, data){
  await new Promise((resolve, reject) =>{
      const sql = "UPDATE employees SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) =>{
          resolve(results);
      });
  });
  const employee = await this.find(id);
  return employee;
}
// delete data
static delete(id){
  return new Promise((resolve, reject) =>{
      const sql = "DELETE FROM employees WHERE id = ?";
      db.query(sql, id, (err, results) =>{
          resolve(results);
      });
  });
}
// search data name
static search(name) {
      return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM employees WHERE name LIKE '%" + name + "%'";
          db.query(sql, name, (err, results) => {
              resolve(results);
          });
      });
  }
// find by status
static async findByStatus(status) {
  // find data by positive status
  if (status == 'active') {
      return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM employees WHERE status = 'active'";
          db.query(sql, status, (err, results) => {
              resolve(results);
          });
      });
  }
  // data by recovered status
  else if (status == 'inactive') {
      return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM employees WHERE status = 'inactive'";
          db.query(sql, status, (err, results) => {
              resolve(results);
          });
      });
  }
  // data by dead status
  else if (status == 'terminated') {
      return new Promise((resolve, reject) => {
          const sql = "SELECT * FROM employees WHERE status = 'terminated'";
          db.query(sql, status, (err, results) => {
              resolve(results);
          });
      });
  }
}
}

// export class Employee
module.exports = Employee;

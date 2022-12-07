"use strict";
const {myConnection} = require('../db/sqlDB');
//Get All data from Database
const getAllEmployee = async () => {
    var query = "Select * from employee";
    return new Promise((resolve, reject) => {
        myConnection.query(query,(err,rows)=>{
            if(!err)  resolve (rows);
            else      reject( err);
        })
    }) 
}
//Get Specific Data from Database
const getEmployeeDetails = async (empId) => {
    var getParticularEmployee = "select * from employee where empId ='"+empId+"'";
    return new Promise((resolve, reject) => {
        myConnection.query(getParticularEmployee, (err,rows)=>{
            if(!err)    resolve (rows);
            else        reject( err);
        })  
    })
}
const getTodoDetails = async (empId) => {
    var query = "select * from todos where empId ='"+empId+"'";
    return new Promise((resolve,reject) =>{
        myConnection.query(query,(err,rows)=>{
            if(!err)    resolve (rows[0]);
            else        reject (err);
        })
    }) 
}
//Checking Email already exist or not
const getEmployeeFromEmailId = async (emailId) => {
    var selectSQL = "select * from employee where emailId = '" + emailId +"'";
    return new Promise((resolve,reject) =>{
        myConnection.query(selectSQL,(err,rows)=>{
            if(!err)    resolve (rows);
            else        reject (err);
        })
    })
}
//Getting DepartmentId from Department Name
const getDeptId = async (deptName) => {
    var selectSQL = "select deptId from department where deptName  = '" + deptName +"'";
    return new Promise((resolve,reject) =>{
        myConnection.query(selectSQL,(err,rows)=>{
            if(!err) resolve(rows[0].deptId);
            else     reject (err);
        })
    })
}
//Insert data in DataBase
const insertAllEmp = async (emp) => {
    try{
        //var insert = "insert into employee (empId,firstName,lastName,emailId,salary,mobileNo,address,userName,passWord,deptId,mgrId,lastLogin) values ("+emp.empId+",'"+emp.firstName+"','"+emp.lastName+"','"+emp.emailId+"',"+emp.salary+","+emp.mobileNo+",'"+emp.address+"','"+emp.userName+"','"+emp.passWord+"',"+emp.deptId+","+emp.mgrId+",'"+emp.lastLogin+"')";
        var insert = "insert into employee (empId,firstName,lastName,emailId,salary,mobileNo,address,deptId,mgrId) values ("+emp.empId+",'"+emp.firstName+"','"+emp.lastName+"','"+emp.emailId+"',"+emp.salary+","+emp.mobileNo+",'"+emp.address+"',"+emp.deptId+","+emp.mgrId+")";
        return new Promise((resolve,reject) =>{
        myConnection.query(insert,(err,rows) => {
            if(!err) { console.log ('--------------------')
                      resolve (rows); }
            else      reject (err);
        }) 
      })   
    }catch(err){
        return(err);
    }
}
const findEmp = async (empId) => {
    var find = "select * from employee where empId = "+empId+" ";
    return new Promise((resolve,reject) =>{
    myConnection.query(find,(err,rows) =>{      
        if(!err)    resolve(rows[0]);
            else    reject(err);
        })
    })
}
//Update data in database
const updateEmpData = async (updtEmp) => {
    var update = "update employee set firstName = '"+ updtEmp.firstName +"',lastName='"+ updtEmp.lastName +"',emailId='"+updtEmp.emailId+"',address='"+updtEmp.address+"',mobileNo="+updtEmp.mobileNo+",salary="+updtEmp.salary+" where empId ="+updtEmp.empId ;
    console.log(update);
    return new Promise((resolve,reject) =>{
        myConnection.query(update,(err,rows) =>{
            if(!err)  resolve(rows);   
            else      reject(err);
        })
    }) 
}
//Delete data from DataBase
const deleteEmpData = (data) => {
    if(data == null) throw new Error("No such number");
        var dltEmp = "delete from employee where empId = '" + data +"'";
            return new Promise((resolve,reject)=>{
                myConnection.query(dltEmp,(err,rows)=>{
                    if(!err)   resolve(rows);
                    else       reject(err);
                })
            })
}
const login = async (log) => {
    var query = "SELECT employee.empId,employee.firstName,employee.lastName,employee.emailId,employee.salary,employee.deptId,employee.mgrId,employee.address,employee.mobileNo,userauth.lastLogin FROM employee INNER JOIN userAuth ON employee.empId = userAuth.empId where userName = '"+log.userName+"'";
    //var query = "select e.empId,e.firstName,e.lastName,e.emailId,e.deptId,e.mgrId,e.address from userauth u,employee e where u.empId=e.empId and userName = '"+log.userName+"' && passWord = '"+log.passWord+"' ";
     return new Promise((resolve,reject) =>{
         myConnection.query(query,(err,rows)=>{
             if(!err) resolve(rows[0]);
             else     reject (err);
         })
     })
}
 const register = async(login) => {
    var query ="Insert into userAuth (empId,userName,passWord,lastLogin) values ("+login.empId+",'"+login.userName+"','"+login.passWord+"','"+login.lastLogin+"')";
    return new Promise((resolve,reject) => {
        myConnection.query(query,(err,rows)=>{ 
            if(!err) resolve(rows); 
            else     reject(err);
        })
    })
}

module.exports = {getAllEmployee,register,login,getEmployeeDetails,getEmployeeFromEmailId,getDeptId,insertAllEmp,updateEmpData,findEmp,deleteEmpData,getTodoDetails};
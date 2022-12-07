//Declare Packages
"use strict"
const express = require('express');
const employeeRoute = express.Router();
const moment = require('moment');
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");
const employeeWorkflow = require('../workflow/employeeWorkflow');

//READ
employeeRoute.get('/getAllEmployee', async (req,res) => {
    try {
        await employeeWorkflow.getAllEmployee().then((rows) => {
           res.status(200).send(rows);   
        }).catch((err) => {
           res.status(500).send('Issue!');
        })
    } catch(err) {
        res.status(500).send(err);
    }
 });
//READ Specific DATA
 employeeRoute.get('/EmployeeDetail/:empId',async(req,res) => {
    try{
        const empId = req.params.empId;
        const empDetails = await employeeWorkflow.getEmployeeDetails(empId);
        const todoDetails = await employeeWorkflow.getTodoDetails(empId);
        //const result = {empDetails,todoDetails};
        var result=[{firstname : empDetails[0].firstName,lastName : empDetails[0].lastName,emailId : empDetails[0].emailId,salary : empDetails[0].salary,deptId : empDetails[0].deptId, mgrId : empDetails[0].mgrId,todoDetails : todoDetails}];
        res.status(200).send(result);
    }catch(err) {
        res.status(500).send('Issue!');
        console.log(err);
    }
 });
 //CREATE
 /*employeeRoute.post('/Create',async(req,res) => {
    try{
        const {firstName, lastName, emailId, salary, deptName, mgrEmail} = req.body;
        if(firstName == null || lastName == null || emailId == null || salary == null || deptName == null ||firstName.trim() == '' || lastName.trim() == '' || emailId.trim() == "" || deptName.trim() == '') {
            res.status(500).send("Please provide all the inputs");
        } else {
            if(emailId != mgrEmail ) {
                const empDetails = await employeeWorkflow.getEmployeeFromEmailId(emailId);
                if(empDetails.length == 0) {
                    const deptId = await employeeWorkflow.getDeptId(deptName);
                    const empDetail = mgrEmail != null ? await employeeWorkflow.getEmployeeFromEmailId(mgrEmail) : null;
                    if(empDetail == null){
                      const mgrId = empDetail != null ? empDetail[0].empId : null;
                      if(mgrId != null){
                       const empId = new Date().getTime();
                       var emp= {empId,firstName,lastName,emailId,salary,deptId,mgrId} ;  
                       await employeeWorkflow.insertAllEmp(emp).then((result)=>{
                       res.status(200).send('One Row Inserted !');
                    }).catch((err) => {
                        res.status(500).send(err);
                    })
                    } else res.status(400).send('Manager Does not exist ');
                } else res.status(400).send("no Manager are their");
                } else  res.status(400).send('Email Id already exists');   
            } else {
                 res.status(400).send('employee email id and manager email id is same');
            } 
            } } catch(err) {
            res.status(500).send(err);
        }      
    });*/
//UPDATE
employeeRoute.post('/update/:empId',async(req,res)=>{
    try{
        const {empId}=req.params;
        const empdtls = await employeeWorkflow.findEmp(empId);
        if(empdtls != null){
           if(req.body.firstName)  empdtls.firstName = req.body.firstName;
           if(req.body.lastName)   empdtls.lastName = req.body.lastName;
           if(req.body.emailId)    empdtls.emailId = req.body.emailId;
           if(req.body.salary)     empdtls.salary = req.body.salary;
           if(req.body.address)    empdtls.address = req.body.address;
           if(req.body.mobileNo)   empdtls.mobileNo = req.body.mobileNo;
            await employeeWorkflow.updateEmpData(empdtls).then((row) =>{
                res.status(200).send('Updated data!');
                }).catch((err) => {
                    res.status(500).send('Issue!');
                })
            }  
        else  res.status(400).send('Invalid Empolyee Id');
    } catch(err){
        res.status(500).send(err);
    }
});
//DELETE
employeeRoute.delete('/delete',async(req,res)=>{
    try{
        const empId = req.body.empId;
        await employeeWorkflow.deleteEmpData(empId).then((err,rows)=>{
            res.status(200).send('Deleted Data');   
        }).catch((err)=>{
            res.status(500).send('Issue!');
        })
    } catch(err){
       res.status(500).send(err);
    }
});
employeeRoute.post('/Resgister', async (req,res) => {
    try{
        const {firstName, lastName, emailId, salary, mobileNo, address, userName, passWord, deptName, mgrEmail} = req.body;
         if(!firstName || !lastName  || !emailId  || !mobileNo || !address || !userName || !passWord || !deptName || !salary || firstName.trim() == '' || lastName.trim() == '' || emailId.trim() == "" || deptName.trim() == '' || address.trim() == '' || userName.trim() == '' || passWord.trim() == '' ) {
            res.status(500).send("Please provide all the inputs");
        } else {
            if(emailId != mgrEmail) {
                const empDetails = await employeeWorkflow.getEmployeeFromEmailId(emailId);
                if(empDetails.length == 0) {
                    const deptId = await employeeWorkflow.getDeptId(deptName);
                    const mgrDetail = mgrEmail != null ? await employeeWorkflow.getEmployeeFromEmailId(mgrEmail) : null;
                    if(mgrDetail != null){
                        const mgrId = mgrDetail != null ? mgrDetail[0].empId : null;
                            const empId = new Date().getTime();
                            var emp ={empId,firstName,lastName,emailId,salary,mobileNo,address,deptId,mgrId};
                            await employeeWorkflow.insertAllEmp(emp).then(async(result)=>{
                             const lastLogin = moment().format('D/M/YYYY hh:mm:ss');
                             const salt = bcrypt.genSaltSync(10);
                             const passWord = bcrypt.hashSync(req.body.passWord,salt);  
                                var user ={empId,userName,passWord,lastLogin};
                                    await employeeWorkflow.register(user).then((row)=>{
                                        res.status(200).json({
                                            sucess : 1,
                                            message : "Registered Sucefully"
                                        });
                                    }).catch((err) => {
                                        res.status(500).send(err);
                                    })
                                }).catch((err) => {
                                    res.status(500).send(err);
                                })
                } else res.status(400).send("no Manager are their");
              } else  res.status(400).send('Email Id already exists'); 
            } else  res.status(400).send('employee email id and manager email id is same');
        }
    }catch(err){
        res.status(500).send(err);
    }
});
employeeRoute.post('/Login', async (req, res) => { 
    try{
        const {userName,passWord}= req.body; 
            //const result = bcrypt.compare(passWord,req.body.passWord); 
            if(!userName || !passWord){
                res.status(500).send("Please provide all the inputs");
            }else{
                
                const result = bcrypt.compare(passWord,req.body[0].passWord) ;



            }     
  }catch(err) {
        res.status(500).send(err);
    }
});
module.exports = employeeRoute;
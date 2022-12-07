/*const express = require('express');
const registerRoute = express.Router();
const employeeWorkflow = require('../workflow/employeeWorkflow');
const moment = require('moment');
const loginWorkflow = require('C:/Arijit/GitRepository/JS Project/workflow/loginWorkflow');

registerRoute.post('/userResgister',async (req,res) =>{
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
                    if(mgrDetail == null){
                        const mgrId = mgrDetail != null ? mgrDetail[0].empId : null;
                        console.log('mgrId',+mgrId);
                            const empId = new Date().getTime();
                            var emp ={empId,firstName,lastName,emailId,salary,mobileNo,address,deptId,mgrId};
                            await employeeWorkflow.insertAllEmp(emp).then(async(result)=>{
                             const lastLogin = moment().format('D/M/YYYY hh:mm:ss');
                                var user ={empId,userName,passWord,lastLogin};
                                    await loginWorkflow.userAuth(user).then((row)=>{
                                        res.status(200).send('Inserted');
                                    }).catch((err) => {
                                        res.status(500).send(err);
                                    })
                                    res.status(200).send('One Row Inserted !');
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

registerRoute.get ('/userDetails',async(req,res)=>{ 
    try{
        const userName = req.body.userName;
        const passWord = req.body.passWord;
        var details = {userName,passWord};
        //console.log(details);
        await loginWorkflow.employeeId(details).then((rows) => {
            //console.log(rows);
            res.status(200).send(rows);
    }).catch((err) => {
        res.status(500).send('Issue!');
    });
  }catch(err) {
        res.status(500).send(err);
    }
});

/*registerRoute.post('/loginUser',async(req,res) =>{
    try{
        const {empId,passWord }= req.body;
        if(!empId){
            res.status(500).send('Please provide Employee Id');
        }else{
            const nameDetails = await loginWorkflow.Name(empId);
            const userName = (nameDetails.firstName).concat(nameDetails.lastName);
            console.log(userName);
            var user ={empId,userName,passWord};
            await loginWorkflow.userAuth(user).then((result)=>{
                res.status(200).send('One Row Inserted !');
             }).catch((err) => {
                res.status(500).send(err);
            })
        }
    }
    catch(err){
        res.status(500).send(err);
    }
})*/
//module.exports = registerRoute;
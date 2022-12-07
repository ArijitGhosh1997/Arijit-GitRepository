const express = require('express');
const todoRoute = express.Router();
const moment = require('moment');
const todoWorkflow = require('C:/Arijit/GitRepository/JS Project/workflow/todoWorkflow');
todoRoute.get('/gelAllTodoList', async (req, res) => {
    try {
        await todoWorkflow.getTodoData().then((rows) => {
            res.status(200).send(rows);   
        }).catch((err) =>{
            res.status(500).send('Issue!');
        });
    } catch (err) {
        res.send(err);
    }
});
todoRoute.get('/getTodoforOne/:empId', async (req, res) => {
    try {
        const empId = req.params.empId;
        await todoWorkflow.getTask(empId).then((rows) => {
                res.status(200).send(rows);
        }).catch((err) => {
            res.status(500).send('Issue!');
        });
    } catch (err) {
        res.send(err);
    }
})
todoRoute.post('/CreateTodo', async (req, res) => {
    try {
        // const { empId, todoDescription, createDate, dueDate, isReminder } = req.body;
        const { empId, todoDescription, isReminder } = req.body;
        if (empId == null || todoDescription == null || isReminder == null || todoDescription.trim() == '') {
            res.status(500).send("Please provide all the inputs");
        } else {
            const createDate = moment().format('D/M/YYYY');  
            console.log(createDate);
            const dueDate = moment().add(3, 'days').format('D/M/YYYY');
            var todos = { empId, todoDescription, createDate, dueDate, isReminder};
            await todoWorkflow.createTodo(todos).then((result) => {
                 res.status(200).send("Inserted Data");
            }).catch((err) => {
                 res.status(500).send('Issue!');
            }); 
        }} catch (err) {
        res.status(500).send(err);
    }
});
todoRoute.post('/updateTodo/:empId/:todoId', async (req, res) => {
    try {  
            const empId = req.params.empId;
            const todoId = req.params.todoId;
            var findtodo = { empId, todoId };
            const todoDtls = await todoWorkflow.findTodo(findtodo);
            if (todoDtls != null) {
                if (req.body.todoDescription)   todoDtls.todoDescription = req.body.todoDescription;
                if (req.body.isReminder)        todoDtls.isReminder = req.body.isReminder;
                if (req.body.createDate)  {                        
                     todoDtls.createDate = req.body.createDate;                   
                }   
                if (req.body.dueDate)  { 
                     todoDtls.dueDate = req.body.dueDate;
                }
                await todoWorkflow.updateTodo(todoDtls).then((rows) => {
                    res.status(200).send('Data Has been Updated Sucessfully');      
                }).catch((err) => {
                    res.status(500).send(err);
                }); 
        } else {
            res.status(400).send('Invalid Todos');
        }} catch (err) {
        res.status(500).send(err);
    }
});
todoRoute.delete('/DeleteTodo/:empId/:todoId', async (req, res) => {
    try {
        const empId = req.params.empId;
        const todoId = req.params.todoId;
        var todo = { empId, todoId };
        await todoWorkflow.deleteTodo(todo).then((rows) => {
                res.status(200).send('Data Dleted Sucessfully');
            }).catch((err) => {
                res.status(500).send('Issue!');
            });    
        } catch (err) {
        res.status(500).send(err);
    }
});
module.exports = todoRoute;
"use strict";
const {myConnection} = require('../db/sqlDB');

const getTodoData = async() =>{
    var query = "select * from todos";
    return new Promise((resolve, reject) => {
        myConnection.query(query,(err,rows)=>{
            if(!err) resolve(rows);
            else     reject(err);
        })
    })   
}
const getTask = async(empId) =>{
    var query = "select * from todos where empId =" +empId;
    return new Promise((resolve, reject) => {
        myConnection.query(query,(err,rows)=>{
            if(!err) resolve(rows);
            else     reject(err);
        })  
    })
}
const createTodo = async(todo) => {
    var query ="Insert into todos (empId,todoDescription,createDate,dueDate,isReminder) values ("+todo.empId+",'"+todo.todoDescription+"','"+todo.createDate+"','"+todo.dueDate+"',"+todo.isReminder+")";
    return new Promise((resolve,reject) => {
        myConnection.query(query,(err,rows)=>{ 
            if(!err) resolve(rows); 
            else     reject(err);
        })
    })
}
const findTodo = async (findtodo) => {
    var find = "select * from todos where empId="+findtodo.empId+" && todoId="+findtodo.todoId;
    return new Promise((resolve,reject) =>{
    myConnection.query(find,(err,rows) =>{      
        if (!err)   resolve(rows[0]);
            else    reject(err);
        })
    })
}
const updateTodo = async(todo) => {
    var query ="update todos set todoDescription='"+todo.todoDescription+"',createDate='"+todo.createDate+"',dueDate='"+todo.dueDate+"',isReminder="+todo.isReminder+" where empId = "+todo.empId+" && todoId="+todo.todoId+"";
    return new Promise((resolve,reject) => {
        myConnection.query(query,(err,rows)=>{ 
            if(!err) resolve(rows);
            else     reject(err);
        })
    })
}
const deleteTodo = async (todo) => {
    var query="delete from todos where todoId="+todo.todoId+"&& empId="+todo.empId;
    return new Promise((resolve,reject) => {
        myConnection.query(query,(err,rows)=>{ 
            if(!err) resolve(rows);
            else     reject(err);
        })
    })
}
module.exports = {getTodoData,getTask,createTodo,updateTodo,deleteTodo,findTodo};
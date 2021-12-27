"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoCollection_1 = require("./todoCollection");
const todoitem_1 = require("./todoitem");
let todos = [new todoitem_1.TodoItem(1, "Go work"), new todoitem_1.TodoItem(2, "Go gym"), new todoitem_1.TodoItem(3, "Go programing"), new todoitem_1.TodoItem(4, "Go to grand")];
let collection = new todoCollection_1.TodoCollection("Zawoj", todos);
console.clear();
console.log(`${collection.userName} Todo List`);
let newId = collection.addTodo("Go for fun");
let todoItem = collection.getTodoById(newId);
todoItem.printDetails();
// collection.addTodo(todoItem)

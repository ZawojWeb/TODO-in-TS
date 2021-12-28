"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoCollection_1 = require("./todoCollection");
const todoitem_1 = require("./todoitem");
const inquirer = require("inquirer");
let todos = [new todoitem_1.TodoItem(1, "Go work"), new todoitem_1.TodoItem(2, "Go gym", true), new todoitem_1.TodoItem(3, "Go programing", true), new todoitem_1.TodoItem(4, "Call to me", true)];
let collection = new todoCollection_1.TodoCollection("Zawoj", todos);
function displayTodoList() {
    console.log(`${collection.userName}'s list with ${collection.getItemCounts().incomplete} incomplete ${collection.getItemCounts().incomplete > 1 ? "tasks" : "task"}`);
    collection.getTodoItems(true).forEach((item) => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Quit"] = "Koniec";
})(Commands || (Commands = {}));
function promtUser() {
    console.clear();
    displayTodoList();
    inquirer
        .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands),
    })
        .then((answers) => {
        if (answers["command"] !== Commands.Quit) {
            promtUser();
        }
    });
}
promtUser();

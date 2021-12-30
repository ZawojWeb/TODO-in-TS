"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const jsonTodoCollection_1 = require("./jsonTodoCollection");
let todos = [];
let collection = new jsonTodoCollection_1.JsonTodoCollection("Zawoj", todos);
let showCompleted = true;
function displayTodoList() {
    console.log(`${collection.userName}'s list with ${collection.getItemCounts().incomplete} incomplete ${collection.getItemCounts().incomplete > 1 ? "tasks" : "task"}`);
    collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Quit"] = "Koniec";
    Commands["Toggle"] = "Poka\u017C lub ukryj wykonane";
    Commands["ADD"] = "Dodaj zadanie";
    Commands["Complete"] = "Zaznacz jako wykonane";
    Commands["Delete"] = "Usu\u0144 wykonane zadania";
})(Commands || (Commands = {}));
function promtUser() {
    //console.clear()
    displayTodoList();
    inquirer
        .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands),
    })
        .then((answers) => {
        switch (answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promtUser();
                break;
            case Commands.ADD:
                promtAdd();
                break;
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promtComplete();
                }
                else {
                    promtUser();
                }
                break;
            case Commands.Delete:
                collection.removeComplete();
                promtUser();
                break;
            default:
                break;
        }
    });
}
promtUser();
function promtAdd() {
    //console.clear()
    inquirer
        .prompt({
        type: "input",
        name: "add",
        message: "Podaj zadanie: ",
    })
        .then((answers) => {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promtUser();
    });
}
function promtComplete() {
    //console.clear()
    inquirer
        .prompt({
        type: "checkbox",
        name: "complete",
        message: "Zaznacz zadanie jako wykonane",
        choices: collection.getTodoItems(showCompleted).map((item) => ({ name: item.task, value: item.id, checked: item.complete })),
    })
        .then((answers) => {
        let completeTaks = answers["complete"];
        collection.getTodoItems(true).forEach((item) => collection.markComplete(item.id, completeTaks.find((id) => id === item.id) != undefined));
        promtUser();
    });
}

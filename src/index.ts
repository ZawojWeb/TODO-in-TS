import { TodoCollection } from "./todoCollection"
import { TodoItem } from "./todoitem"
import * as inquirer from "inquirer"

let todos: TodoItem[] = [new TodoItem(1, "Go work"), new TodoItem(2, "Go gym", true), new TodoItem(3, "Go programing", true), new TodoItem(4, "Call to me", true)]
let collection = new TodoCollection("Zawoj", todos)

function displayTodoList(): void {
  console.log(`${collection.userName}'s list with ${collection.getItemCounts().incomplete} incomplete ${collection.getItemCounts().incomplete > 1 ? "tasks" : "task"}`)
  collection.getTodoItems(true).forEach((item) => item.printDetails())
}

enum Commands {
  Quit = "Koniec",
}

function promtUser(): void {
  console.clear()
  displayTodoList()

  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands),
    })
    .then((answers) => {
      if (answers["command"] !== Commands.Quit) {
        promtUser()
      }
    })
}
promtUser()

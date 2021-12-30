import { TodoCollection } from "./todoCollection"
import { TodoItem } from "./todoitem"
import * as inquirer from "inquirer"
import { JsonTodoCollection } from "./jsonTodoCollection"

let todos: TodoItem[] = []
let collection: TodoCollection = new JsonTodoCollection("Zawoj", todos)
let showCompleted = true

function displayTodoList(): void {
  console.log(`${collection.userName}'s list with ${collection.getItemCounts().incomplete} incomplete ${collection.getItemCounts().incomplete > 1 ? "tasks" : "task"}`)
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails())
}

enum Commands {
  Quit = "Koniec",
  Toggle = "Pokaż lub ukryj wykonane",
  ADD = "Dodaj zadanie",
  Complete = "Zaznacz jako wykonane",
  Delete = "Usuń wykonane zadania",
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
      switch (answers["command"]) {
        case Commands.Toggle:
          showCompleted = !showCompleted
          promtUser()
          break
        case Commands.ADD:
          promtAdd()
          break
        case Commands.Complete:
          if (collection.getItemCounts().incomplete > 0) {
            promtComplete()
          } else {
            promtUser()
          }
          break
        case Commands.Delete:
          collection.removeComplete()
          promtUser()
          break
        default:
          break
      }
    })
}
promtUser()

function promtAdd(): void {
  console.clear()
  inquirer
    .prompt({
      type: "input",
      name: "add",
      message: "Podaj zadanie: ",
    })
    .then((answers) => {
      if (answers["add"] !== "") {
        collection.addTodo(answers["add"])
      }
      promtUser()
    })
}

function promtComplete(): void {
  console.clear()

  inquirer
    .prompt({
      type: "checkbox",
      name: "complete",
      message: "Zaznacz zadanie jako wykonane",
      choices: collection.getTodoItems(showCompleted).map((item) => ({ name: item.task, value: item.id, checked: item.complete })),
    })
    .then((answers) => {
      let completeTaks = answers["complete"] as number[]
      collection.getTodoItems(true).forEach((item) => collection.markComplete(item.id, completeTaks.find((id) => id === item.id) != undefined))
      promtUser()
    })
}

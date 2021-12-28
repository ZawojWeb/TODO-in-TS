import { TodoCollection } from "./todoCollection"
import { TodoItem } from "./todoitem"

let todos: TodoItem[] = [new TodoItem(1, "Go work"), new TodoItem(2, "Go gym"), new TodoItem(3, "Go programing"), new TodoItem(4, "Call to me", true)]

let collection = new TodoCollection("Zawoj", todos)

console.clear()
console.log(`${collection.userName} Todo List`)

collection.getTodoItems(true).forEach((item) => item.printDetails())
console.log("---After delete complete")
collection.removeComplete()
collection.getTodoItems(true).forEach((item) => item.printDetails())

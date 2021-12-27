import { TodoCollection } from "./todoCollection"
import { TodoItem } from "./todoitem"

let todos: TodoItem[] = [new TodoItem(1, "Go work"), new TodoItem(2, "Go gym"), new TodoItem(3, "Go programing"), new TodoItem(4, "Go to grand")]

let collection = new TodoCollection("Zawoj", todos)

console.clear()
console.log(`${collection.userName} Todo List`)

let newId = collection.addTodo("Go for fun")
let todoItem = collection.getTodoById(newId)
todoItem.printDetails()

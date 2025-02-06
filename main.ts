import { Task } from "./task";
import { TodoList } from "./todo-list";

const homework13 = new Task(
  "Finish this homework",
  "Bring this code to perfection"
);
homework13.complete();
homework13.editTask(undefined, "Hand in this homework");
homework13.editTask("Homework finished!", undefined);
// homework13.printTask();

const ts_oop = new Task("Learn TypeScript", "Practice OOP concepts", true);
// ts_oop.printTask();

const todoList = new TodoList([]);
todoList.addTask(homework13);
todoList.addTask(ts_oop);
// todoList.printTasks()
console.log(todoList.searchTask(undefined, "Practice OOP concepts"));
console.log(todoList.searchTask("Homework finished!", undefined));
// todoList.printTasksAmount() // 2
// todoList.printUncompletedTasks() // "Learn TypeScript"
// todoList.sortTasksByCreation(true) // "Homework finished!", "Learn TypeScript"
// todoList.sortTasksByStatus(false) // "Learn TypeScript", "Homework finished!"
todoList.deleteTask(homework13);
todoList.deleteTask(ts_oop, false);

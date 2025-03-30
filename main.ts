import { Task } from "./task";
import { TodoList } from "./todo-list";

const homework13 = new Task(
  "Finish this homework",
  "Bring this code to perfection"
);

//test

// homework13.completeTask();
// homework13.editTask(undefined, "Hand in this homework");
// homework13.editTask("Homework finished!", undefined);
// homework13.printTask();

const ts_oop = new Task("Learn TypeScript", "Practice OOP concepts", true);
// ts_oop.printTask();

const todoList = new TodoList();
todoList.addTask(homework13);
todoList.addTask({ ...homework13, title: "Update homework" } as Task);
todoList.addTask(ts_oop);
todoList.editTask(homework13.title, {
  title: "Improve homework",
  //description: "Practise software design principles",
});
ts_oop.completeTask();
todoList.sortTasksByCreation(false);

// todoList.editTask(homework13, 'Improve this homework', undefined)
// todoList.editTask(ts_oop, undefined, 'Practise software design principles', true)

//todoList.tasks[1].initDate = 'hello' // TypeError: Cannot set property completed of #<Task> which has only a getter

// console.log(todoList.searchTask(undefined, "Practice OOP concepts"));
//console.log(todoList.searchTask("Homework finished!", undefined));

// todoList.printTasksAmount() // 2
// todoList.printUncompletedTasks() // "Learn TypeScript"
// todoList.sortTasksByCreation(true) // "Homework finished!", "Learn TypeScript"
// todoList.sortTasksByStatus(false) // "Learn TypeScript", "Homework finished!"

//todoList.deleteTask(homework13.title);
//todoList.deleteTask(ts_oop.title);

todoList.printTasks();

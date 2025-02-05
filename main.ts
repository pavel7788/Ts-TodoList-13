import { Task } from "./task";
import { TodoList } from "./todo-list";

const task = new Task('Finish this homework', 'Bring this code to perfection')
console.log(task.complete())
console.log(task.editTask(undefined, 'Hand in this homework'))
console.log(task.editTask('Homework finished!', undefined))
console.log(task.printTask())

const schedule = new TodoList([task])
console.log(schedule.addTask(new Task('', 'Bring this code to perfection')))
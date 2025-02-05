import { Task } from "./task";

interface ITodoList {
  tasks: Task[];
  addTask(task: Task): void;
  deleteTask(task: Task): void;
  editTask(task: Task, newTitle?: string, newDescription?: string): void;
  printTasks(): void;
  printTasksAmount(): void;
  printUncompletedTasks(): void;
  searchTask(title?: string, description?: string): Task[];
  sortTasksByStatus(): void;
  sortTasksByCreation(increasing: boolean): void;
}

export class TodoList implements ITodoList {
  constructor(public tasks: Task[]) {}

  addTask(task: Task): void {
    if (this.tasks.includes(task)) console.log(`Couldn't add existing task`);
    this.tasks.push(task);
  }
  deleteTask(task: Task): void {
    if (!this.tasks.includes(task))
      console.log("Impossible to delete unexisting task");
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
  printTasks(): void {
    console.log(this.tasks);
  }
  printTasksAmount(): void {
    console.log(this.tasks.length);
  }
  printUncompletedTasks(): void {
    this.tasks.forEach((task) => {
      if (!task.completed) console.log(task);
    });
  }
  searchTask(title?: string, description?: string): Task[] {
    if (!title && !description) {
      console.log("Task not found");
      return [];
    }

    const foundTasks = this.tasks.filter((task) => {
      const matchTitle = title ? task.title.includes(title) : true;
      const matchDescription = description
        ? task.description.includes(description)
        : true;
      return matchTitle && matchDescription;
    });

    if (foundTasks.length === 0) console.log("Task not found");

    return foundTasks;
  }
  sortTasksByStatus(completed: boolean = false): Task[] {
    const foundTasks = this.tasks.filter(
      (task) => task.completed === completed
    );

    if (foundTasks.length === 0) {
      console.log(`No ${completed ? "completed" : "uncompleted"} tasks found.`);
    }

    return foundTasks;
  }

  sortTasksByCreation(increasing: boolean): void {
    throw new Error("Method not implemented.");
  }
}

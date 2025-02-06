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
  sortTasksByStatus(completed: boolean): void;
  sortTasksByCreation(increasing: boolean): void;
}

export class TodoList implements ITodoList {
  constructor(public tasks: Task[]) {}

  addTask(task: Task): void {
    if (this.tasks.includes(task))
      throw new Error(`Couldn't add existing task`);
    this.tasks.push(task);
  }
  deleteTask(task: Task, confirmation?: boolean): void {
    if (!this.tasks.includes(task)) {
      console.log("Impossible to delete unexisting task");
      return;
    }
    if (task.protectedTask && confirmation === undefined) {
      throw new Error(`Couldn't delete protected task. Confirmation required`);
    }
    if (confirmation === false) {
      console.log("Operation cancelled");
      return;
    }
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
  sortTasksByStatus(completed: boolean): Task[] {
    const foundTasks = this.tasks.filter(
      (task) => task.completed === completed
    );

    if (foundTasks.length === 0) {
      console.log(`No ${completed ? "completed" : "uncompleted"} tasks found.`);
    }

    return foundTasks;
  }

  sortTasksByCreation(increasing: boolean): void {
    console.log(
      this.tasks.slice().sort((a, b) => {
        if (increasing) return a.initDate.getTime() - b.initDate.getTime();
        return b.initDate.getTime() - a.initDate.getTime();
      })
    );
  }
}

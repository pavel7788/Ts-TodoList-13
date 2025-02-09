import { IUpdateTask, Task } from "./task";

interface ITodoList {
  tasks: Task[];
  addTask(task: Task): void;
  deleteTask(title: string, confirmation?: boolean): void;
  editTask(
    title: string,
    body: IUpdateTask,
    updateConfirmation?: boolean
  ): void;
  printTasks(): void;
  printTasksAmount(): void;
  printUncompletedTasks(): void;
  searchTask(term: string, criteria: "title" | "description"): Task;
  sortTasksByStatus(ascending: boolean): void;
  sortTasksByCreation(ascending: boolean): void;
}

export class TodoList implements ITodoList {
  private _tasks: Task[] = [];

  constructor() {}

  get tasks() {
    return this._tasks;
  }

  addTask(task: Task): void {
    const taskTitles = this.tasks.map((t) => t.title);
    if (taskTitles.includes(task.title))
      throw new Error(`Couldn't add existing task`);
    this.tasks.push(task);
  }

  editTask(
    title: string,
    body: IUpdateTask,
    updateConfirmation?: boolean
  ): void {
    if (Object.keys(body).length === 0) {
      console.log("Body can't be empty");
      return
    }
    const deleteBody = this.searchTask(title);
    if (deleteBody.isProtected && !updateConfirmation) {
      console.log("Can't update protected task");
      return;
    }

    const updateBody = {
      ...deleteBody,
      ...body,
      //editedDate: new Date(),
    }
    if (updateBody instanceof Task) {
      updateBody.updateDate();
      this._tasks.splice(this.tasks.indexOf(deleteBody), 1);
      this._tasks.push(updateBody);
    }    
  }

  deleteTask(title: string, confirmation?: boolean): void {
    const task = this.searchTask(title);
    if (task.isProtected) {
      if (!confirmation || undefined) {
        console.log("Can't delete protected task. Confirmation required");
        return;
      }
    }
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  printTasks(): void {
    console.log(this._tasks);
  }

  printTasksAmount(): void {
    console.log(this._tasks.length);
  }

  printUncompletedTasks(): void {
    this._tasks.filter((t) => !t.isCompleted).forEach((u) => console.log(u));
    // this.tasks.forEach((task) => {
    //   if (!task.isCompleted) console.log(task);
    // });
  }

  searchTask(term: string, criteria: "title" | "description" = "title"): Task {
    let searchResult: Task | undefined;
    if (criteria === "title")
      searchResult = this.tasks.find((t) => t.title === term);

    if (criteria === "description")
      searchResult = this.tasks.find((t) => t.description === term);

    if (searchResult === undefined) throw new Error("Task not found");

    return searchResult as Task;
  }

  getTaskId(term: string, criteria: "title" | "description" = "title"): string {
    const task = this.searchTask(term, criteria);
    return task.id;
  }

  sortTasksByStatus(ascending: boolean = true): void {
    if (ascending)
      this._tasks.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    else
      this._tasks.sort((a, b) => Number(b.isCompleted) - Number(a.isCompleted));
  }

  sortTasksByCreation(ascending: boolean = true): void {
    if (ascending)
      this._tasks.sort((a, b) => a.initDate.getTime() - b.initDate.getTime());
    else
      this._tasks.sort((a, b) => b.initDate.getTime() - a.initDate.getTime());
  }
}

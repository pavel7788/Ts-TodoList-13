interface ITask {
  title: string;
  description: string;
  isCompleted: boolean;
  creationDate: Date;
  editedDate?: Date;
  complete(): void;
  editTask(newTitle?: string, newDescription?: string): void;
  printTask(): void;
}

export class Task implements ITask {
  private isCompleted: boolean = false;
  readonly creationDate: Date = new Date();
  editedDate?: Date;

  constructor(public title: string, public description: string) {
    if (!this.title.trim() || !this.description.trim()) {
      throw new Error("Task can't be empty");
    }
  }

  get completed() {
    return this.isCompleted
  }

  complete(): void {
    this.isCompleted = true;
  }

  editTask(newTitle?: string, newDescription?: string): void {
    if (!newTitle && !newDescription) {
      console.log(
        "Impossible to edit task. Method should receive at least 1 argument"
      );
      return;
    }

    this.title = newTitle ?? this.title;
    this.description = newDescription ?? this.description;
    this.editedDate = new Date();
  }

  printTask(): void {
    console.log(this);
  }
}

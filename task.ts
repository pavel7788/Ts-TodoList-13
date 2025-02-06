interface ITask {
  title: string;
  description: string;
  protectedTask?: boolean;
  isCompleted: boolean;
  initDate: Date;
  editedDate?: Date;
  complete(): void;
  editTask(newTitle?: string, newDescription?: string): void;
  printTask(): void;
}

export class Task implements ITask {
  private isCompleted: boolean = false;
  readonly initDate: Date = new Date();
  editedDate?: Date;

  constructor(
    public title: string,
    public description: string,
    readonly protectedTask?: boolean
  ) {
    if (!this.title.trim() || !this.description.trim()) {
      throw new Error("Task can't be empty");
    }
  }

  get completed() {
    return this.isCompleted;
  }

  complete(): void {
    this.isCompleted = true;
  }

  editTask(
    newTitle?: string,
    newDescription?: string,
    confirmation?: boolean
  ): void {
    if (!newTitle && !newDescription) {
      console.log(
        "Impossible to edit task. Method should receive at least 1 argument"
      );
      return;
    }
    if (this.protectedTask && !confirmation) {
      throw new Error(`Couldn't edit protected task. Confirmation required`);
    }
    if (confirmation === false) {
      console.log("Operation cancelled");
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

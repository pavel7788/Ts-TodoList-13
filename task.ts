import { nanoid } from 'nanoid'

interface ITask {
  id: string;
  title: string;
  description: string;
  isProtected?: boolean;
  isCompleted: boolean;
  initDate: Date;
  completeTask(): void;
  printTask(): void;
}

export interface IUpdateTask {
  title?: string,
  description?: string,
  isProtected?: boolean,
  isCompleted?: boolean
}

export class Task implements ITask {
  private _id = nanoid();
  private _isCompleted: boolean = false;
  readonly initDate: Date = new Date();
  private editedDate?: Date;

  constructor(
    public title: string = 'New Task',
    public description: string = '',
    readonly isProtected: boolean = false
  ) {
    // if (!this.title.trim() || !this.description.trim()) {
    //   throw new Error("Task can't be empty");
    // }
  }

  get id(): string {
    return this._id;
  }

  set isCompleted(value: boolean) {
    this._isCompleted = value;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  updateDate(): void {
    this.editedDate = new Date();
  }

  completeTask(): void {
    this._isCompleted = true;
  }

  printTask(): void {
    console.log(this);
  }
}

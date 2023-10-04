export interface IEditTodo {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
}
export interface ITodo{
  readonly userId: number;
  id: number;
  title: string;
  description?: string;
  completed?: boolean;
}

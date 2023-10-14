import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TodoService} from "../shared/services/todo.service";
import {ITodo} from "../shared/interfaces/todo.interface";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control<string>("", {validators: Validators.required}),
    description: this.fb.nonNullable.control<string>("", {validators: Validators.required}),
  });

  editForm = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control<string>("", {validators: Validators.required}),
    description: this.fb.nonNullable.control<string>("", {validators: Validators.required}),
    }
  )
  todos: ITodo[] | null = [];
  editing: number | null = null

  constructor(private readonly fb: FormBuilder, private readonly todoService: TodoService,) {}

  ngOnInit(): void{
    this.getAllTodos();
  }

  getAllTodos(){this.todoService.getAllTodos().subscribe(
        {
          next: (value) => (this.todos = value),
          error: (err) => console.error(err)
        });
  }

  addTodo(){
    const payload = this.todoForm.getRawValue();

    this.todoService.createTodo(payload).subscribe({
      next: () => this.getAllTodos(),
      error: (err) => console.error(err),
    });
  }

  deleteTodo(id: number){
      this.todoService.deleteTodo(id).subscribe({
        next: () => this.getAllTodos(),
        error: (err) => console.error(err),
      });
  }

  editTodo(id: number){
    const payload = this.editForm.getRawValue();
    this.todoService.editTodo(payload, id).subscribe({
      next: () => this.getAllTodos(),
      error: (err) => console.error(err),
      }
    )
    this.editing = null;
  }
}

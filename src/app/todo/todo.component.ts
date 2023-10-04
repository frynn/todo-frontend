import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TodoService} from "../shared/services/todo.service";
import {AuthService} from "../shared/services/auth.service";
import {Observable, pipe} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ITodo} from "../shared/interfaces/todo.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control<string>("", {validators: Validators.required}),
    description: this.fb.nonNullable.control<string>("", {validators: [Validators.required, Validators.email]}),
  });

  constructor(private readonly fb: FormBuilder,
              private readonly todoService: TodoService,
              private readonly authService: AuthService,
              private router: Router) {
    this.todos = []
  }
    todos: ITodo[] | null;
    getAllTodos(){
    this.todoService.getAllTodos().subscribe(
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
  ngOnInit(): void {
    this.getAllTodos()
  }

}

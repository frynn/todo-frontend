import { Injectable } from '@angular/core';
import {ITodo} from "../interfaces/todo.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private readonly http: HttpClient) { }

  getAllTodos():Observable<ITodo[] | null>{
    return this.http.get<ITodo[]>("http://localhost:3000/todo")
  }

  createTodo(payload: Partial<ITodo>):Observable<ITodo>{
    return this.http.post<ITodo>("http://localhost:3000/todo", payload);
  }

  deleteTodo(id: number):Observable<number>{
    return this.http.delete<number>(`http://localhost:3000/todo/${id}`)
  }

  editTodo(payload: Partial<ITodo>, id: number): Observable<ITodo>{
    return this.http.patch<ITodo>(`http://localhost:3000/todo/${id}`, payload);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

import { Todo } from './todo'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  getAllTasks() {
    return this.httpClient.get(`http://localhost:3000/todos`)
  }

  getTask(id: any) {
    return this.httpClient.get(`http://localhost:3000/todos/${id}`)
  }

  updateTask(id: any, data: any) {
    return this.httpClient.put(`http://localhost:3000/todos/${id}`, data)
  }
}

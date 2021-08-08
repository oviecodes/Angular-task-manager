import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

import { Todo } from './todo'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = `http://localhost:3000/todos/`

  constructor(private httpClient: HttpClient) { }

  getAllTasks() {
    return this.httpClient.get(this.baseUrl)
  }

  getTask(id: any) {
    return this.httpClient.get(`${this.baseUrl}${id}`)
  }

  updateTask(id: any, data: any) {
    return this.httpClient.put(`${this.baseUrl}${id}`, data)
  }

  createTask(data: any) {
    return this.httpClient.post(`${this.baseUrl}`, data)
  }

  deleteTask(id: any) {
    return this.httpClient.delete(`${this.baseUrl}${id}`)
  }
}

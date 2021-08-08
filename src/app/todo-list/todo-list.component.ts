


import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Todo } from '../todo'
import { TodoService } from '../todo.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

  
export class TodoListComponent implements OnInit {

  allTodos:any = []

  tasks:any = []

  complete: Array<Todo> = []

  incomplete: Array<Todo> = []

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }

  addTodoForm = this.formBuilder.group({
    task: ''
  });

  done(todo: any, id: any) {
    todo.done = !todo.done
    // this.reAssignTodos()
    // this.persistTodo(this.allTodos)
    console.log(this.allTodos)
  }

  newTodo() {
    const todo = {
      name: this.addTodoForm.value.task,
    }
    console.log(this.allTodos)
    this.allTodos.unshift(todo)
    this.reAssignTodos()
    this.persistTodo(this.allTodos)
    this.addTodoForm.reset()
  }

  deleteTodo(todo: any, id: any) {
    this.allTodos.splice(this.allTodos.findIndex((el: any) => el.id === id), 1)
    this.reAssignTodos()
    this.persistTodo(this.allTodos)
  }

  persistTodo(allTodos: any) {
    window.localStorage.setItem('todo', JSON.stringify(allTodos))
  }



  reAssignTodos() {
    this.complete = this.allTodos.filter((el:any) => el.done === true)
    this.incomplete = this.allTodos.filter((el:any) => el.done === false)
  }

  ngOnInit(): void {
   
    this.todoService.getAllTasks().subscribe(
      (data: any) => {
        this.allTodos = data
        this.reAssignTodos()
      })
    
  }

}

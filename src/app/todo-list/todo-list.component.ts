


import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Todo } from '../todo'


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

  
export class TodoListComponent implements OnInit {

  allTodos: Array<Todo> = []

  complete: Array<Todo> = []

  incomplete: Array<Todo> = []

  constructor(private formBuilder: FormBuilder) { }

  addTodoForm = this.formBuilder.group({
    task: ''
  });

  done(todo: any, i: any) {
    todo.done = !todo.done
    //move todo to end if done and if undone move to top
    this.allTodos.splice(i, 1)
    this.reAssignTodos()
    todo.done  === true ?
      this.complete.push(todo) :
      this.incomplete.push(todo)
    this.persistTodo(this.allTodos)
  }

  newTodo() {
    const todo: Todo = {
      name: this.addTodoForm.value.task,
      done: false,
      tasks: []
    }
    this.allTodos.unshift(todo)
    this.reAssignTodos()
    this.persistTodo(this.allTodos)
    this.addTodoForm.reset()
  }

  deleteTodo(todo: any, i: any) {
    this.allTodos.splice(i, 1)
    this.reAssignTodos()
    this.persistTodo(this.allTodos)
  }

  persistTodo(allTodos: any) {
    window.localStorage.setItem('todo', JSON.stringify(allTodos))
  }

  getAllTodos() {
    this.allTodos = JSON.parse(window.localStorage.getItem('todo')!) || []
  }

  reAssignTodos() {
    this.complete = this.allTodos.filter((el:any) => el.done === true)
    this.incomplete = this.allTodos.filter((el:any) => el.done === true)
  }

  ngOnInit(): void {
    this.getAllTodos()
    this.reAssignTodos()
    console.log(this.allTodos)
  }

}

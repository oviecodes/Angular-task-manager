


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

  msg:string = ''

  complete: Array<Todo> = []

  incomplete: Array<Todo> = []

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }

  addTodoForm = this.formBuilder.group({
    task: ''
  });

  done(todo: any, id: any) {
    todo.done = !todo.done
    this.todoService.updateTask(id, todo).subscribe(data => todo = data)
    this.reAssignTodos()
  }

  newTodo() {
    let todo = {
      name: this.addTodoForm.value.task,
      todos: [],
      done: false
    }
    
    this.todoService.createTask({ name: this.addTodoForm.value.task })
      .subscribe((data: any) => {
        todo = data
        this.allTodos.unshift(todo)
        this.reAssignTodos()
      })
   
    this.addTodoForm.reset()
  }

  deleteTodo(todo: any, id: any) {

    this.allTodos.splice(this.allTodos.findIndex((el: any) => el._id === id), 1)
    this.reAssignTodos()
    this.todoService.deleteTask(id).subscribe((data: any) => {
      this.msg = data.msg
      
    })
   
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

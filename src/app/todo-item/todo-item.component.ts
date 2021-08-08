import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Todo } from '../todo'
import { TodoService } from '../todo.service'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  todo:any = []

  tasks:any = []

  // allTodo = {}

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private todoService: TodoService) { }

  addNewItem = this.formBuilder.group({
    item: ''
  })

  param = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {    
    this.todoService.getTask(this.param).subscribe((data: any) => {
      this.todo = data
      this.tasks = data.todos
      this.checkDone()
      this.updtateDone()
      this.persistTasks()
    })
  }


  checkDone() {
    this.todo.done === true ?
      this.tasks.forEach((el: any) => el.completed = true) : null
  }

  updtateDone() {
    this.tasks.filter((el: any) => el.completed === true).length === this.tasks.length ?
      this.todo.done = true : this.todo.done = false
  }


  newItem() {
    const newTodo = {
      title: this.addNewItem.value.item,
      done: false
    }

    this.tasks.unshift(newTodo)
    this.addNewItem.reset()
    this.todo.todos = this.tasks
    this.persistTasks()
  }

  done(todo: any, id: any) {
    todo.done = !todo.done

    this.tasks.splice(id, 1)

    todo.done === true ?
      this.tasks.push(todo) :
      this.tasks.unshift(todo)

    this.todo.todos = this.tasks
    this.updtateDone()
    this.persistTasks()
  }

  persistTasks() {
    this.todoService.updateTask(this.param, this.todo).subscribe(data => this.todo = data)
  }

}

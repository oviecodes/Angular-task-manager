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
      this.updateDone()
      this.persistTasks()
    })
  }


  //this checks if the todo(parent task) is done and update the child task accordingly
  checkDone() {
    this.todo.done === true ?
      this.tasks.forEach((el: any) => el.done = true) : null
  }

  //this checks if all the child tasks are done then updates the parent task accordingly
  updateDone() {
    this.tasks.filter((el: any) => el.done === true).length === this.tasks.length ?
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
    this.updateDone()
    this.persistTasks()
  }


  persistTasks() {
    this.todoService.updateTask(this.param, this.todo).subscribe(data => this.todo = data)
  }

}

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Todo } from '../todo'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  todo!: Todo

  tasks:any[] = []

  allTodo = JSON.parse(window.localStorage.getItem('todo')!)

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  addNewItem = this.formBuilder.group({
    item: ''
  })

  param = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap;

    this.todo = this.allTodo[Number(param.get('id'))]!
    this.tasks = this.allTodo[Number(param.get('id'))].tasks!
    this.checkDone()
    this.updtateDone()
    this.persistTasks()
  }


  checkDone() {
    this.todo.done === true ?
      this.tasks.forEach(el => el.completed = true) : null
  }

  updtateDone() {
    this.tasks.filter(el => el.completed === true).length === this.tasks.length ?
      this.todo.done = true : null
  }


  newItem() {
    const newTodo = {
      task: this.addNewItem.value.item,
      completed: false
    }

    this.tasks.unshift(newTodo)
    this.addNewItem.reset()
    this.todo.tasks = this.tasks
    this.persistTasks()
  }

  done(todo: any, i: number) {
    todo.completed = !todo.completed

    this.tasks.splice(i, 1)

    todo.completed === true ?
      this.tasks.push(todo) :
      this.tasks.unshift(todo)

    this.todo.tasks = this.tasks
    this.updtateDone()
    this.persistTasks()
  }

  persistTasks() {
    this.allTodo[this.param].tasks = this.todo.tasks
    window.localStorage.setItem('todo', JSON.stringify(this.allTodo))
  }

}

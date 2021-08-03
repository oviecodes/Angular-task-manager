import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  todo!: Todo

  allTodo = JSON.parse(window.localStorage.getItem('todo')!)

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap;

    this.todo = this.allTodo[Number(param.get('id'))]!
  }

}

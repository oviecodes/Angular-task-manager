import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  allTodos = ['learn TypeScript', 'learn Angular']

  constructor() { }

  ngOnInit(): void {
  }

}

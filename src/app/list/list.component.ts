import { Component, inject } from '@angular/core';
import { TodoService } from '../todo/todo.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './list.component.html',
})
export default class ListComponent {
  todoService = inject(TodoService);
  list = this.todoService.todoList;

  markDone(index: number) {
    this.todoService.markDone(index);
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoService } from '../todo/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  pendingTodo = inject(TodoService).pendingTodo;
}

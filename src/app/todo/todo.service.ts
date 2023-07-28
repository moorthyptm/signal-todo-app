import { Injectable, computed, signal } from '@angular/core';
import { TodoList } from './todo.model';

@Injectable()
export class TodoService {
  todoList = signal<TodoList[]>([]);
  editIndex = signal<number | null>(null);

  pendingTodo = computed(
    () => this.todoList().filter((todo) => !todo.isDone).length
  );

  updateTodo({ title, comment }: { title: string; comment: string }): void {
    const editIndex = this.editIndex(); //else typecast required

    if (editIndex !== null) {
      this.todoList.mutate(
        (value) => (value[editIndex] = new TodoList(title, comment))
      );

      // Reset edit index
      this.editIndex.set(null);
    } else {
      this.todoList.mutate((value) => value.push(new TodoList(title, comment)));
    }
  }

  removeTodo(index: number) {
    this.todoList.mutate((value) => value.splice(index, 1));
  }

  getTodo(index: number): TodoList | null {
    if (this.todoList().length && index < this.todoList().length) {
      return this.todoList()[index];
    }
    return null;
  }

  editStart(index: number): void {
    if (this.todoList().length && index < this.todoList().length) {
      this.editIndex.set(index);
      return;
    }
    this.editIndex.set(null);
    return;
  }

  markDone(index: number): void {
    this.todoList.mutate((value) => (value[index].isDone = true));
  }
}

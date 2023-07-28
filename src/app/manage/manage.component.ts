import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '../todo/todo.service';
import { ITodoForm } from './manage.model';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export default class ManageComponent {
  private fb = inject(NonNullableFormBuilder);
  private todoService = inject(TodoService);

  editIndex$ = toObservable(this.todoService.editIndex).pipe(
    takeUntilDestroyed()
  );
  // Just for demo, You directly use signal to do this logic with computed
  editMode = toSignal<boolean>(
    this.editIndex$.pipe(map((index) => index !== null))
  );

  get list() {
    return this.todoService.todoList;
  }

  constructor() {
    this.editIndex$
      .pipe(
        filter((index) => index !== null),
        map((index) => this.todoService.getTodo(index as number)),
        filter(Boolean)
      )
      .subscribe((patchData) => {
        this.todoForm.patchValue({
          title: patchData.title,
          comment: patchData.comment,
        });
      });
  }

  todoForm = this.fb.group<ITodoForm>({
    title: this.fb.control('', Validators.required),
    comment: this.fb.control('', Validators.required),
  });

  onSubmit() {
    this.todoService.updateTodo(this.todoForm.getRawValue());
    this.todoForm.reset();
  }

  onEdit(index: number) {
    this.todoService.editStart(index);
  }

  onDelete(index: number) {
    this.todoService.removeTodo(index);
  }
}

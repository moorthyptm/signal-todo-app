import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITodoForm } from './manage.model';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export default class ManageComponent {
  private fb = inject(NonNullableFormBuilder);

  todoForm = this.fb.group<ITodoForm>({
    title: this.fb.control('', Validators.required),
    comment: this.fb.control('', Validators.required),
  });

  onSubmit() {
    console.log(this.todoForm.value);
  }
}

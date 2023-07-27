import { FormControl } from '@angular/forms';

export interface ITodoForm {
  title: FormControl<string>;
  comment: FormControl<string>;
}

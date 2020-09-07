import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoState } from 'src/app/store/todo.reducers';
import { Todo } from '../../models/todo.model';
import { createTodo } from 'src/app/store/todo.actions';
import { TodoService } from '../../service/todo.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  providers: [TodoService],
})
export class AddTodoComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private store: Store<TodoState>
  ) {}

  ngOnInit(): void {}

  onSubmit(submittedForm: any): void {
    if (submittedForm.invalid) {
      return;
    }
    if (submittedForm.valid) {
      console.log(submittedForm.value);
      const todo: Todo = {
        id: uuid.v4(),
        todoType: submittedForm.value.todoType,
        todoName: submittedForm.value.todoName,
        todoDescription: submittedForm.value.todoDescription,
        createdAt: null,
        updatedAt: null,
      };
      this.store.dispatch(createTodo({ todo }));
    }
  }
}

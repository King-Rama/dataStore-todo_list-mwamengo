import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { Store } from '@ngrx/store';
import { TodoStateApp } from 'src/app/store/reducers';
import { Update } from '@ngrx/entity';
import { TodoService } from '../../service/todo.service';
import { todoActionTypes } from '../../../../store/todo.actions';
import { getAllTodos } from '../../../../store/todo.selectors';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
  providers: [TodoService],
})
export class ListTodoComponent implements OnInit {
  /** ngx Pagination  */
  p = 1;
  /** Todos fetching into variables */
  todos: Observable<Todo[]>;
  todoToBeUpdated: Todo;
  isUpdateActivated = false;

  constructor(
    private todoService: TodoService,
    private store: Store<TodoStateApp>
  ) {}

  ngOnInit(): void {
    /****** Fetch todos*/
    this.todos = this.store.select(getAllTodos);
  }
  /** delete todos */
  deleteTodo(todoId: string): void {
    this.store.dispatch(todoActionTypes.deleteTodo({ todoId }));
  }

  /** update form */
  showUpdateForm(todo: Todo): void {
    this.todoToBeUpdated = { ...todo };
    this.isUpdateActivated = true;
  }

  /** update todos */
  updateTodo(updateForm): void {
    const update: Update<Todo> = {
      id: this.todoToBeUpdated.id,
      changes: {
        ...this.todoToBeUpdated,
        ...updateForm.value,
      },
    };

    this.store.dispatch(todoActionTypes.updateTodo({ update }));

    this.isUpdateActivated = false;
    this.todoToBeUpdated = null;
  }
}

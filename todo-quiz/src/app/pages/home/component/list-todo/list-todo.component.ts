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
  providers: [TodoService]
})
export class ListTodoComponent implements OnInit {


  todos: Observable<Todo[]>;

  todoToBeUpdated: Todo;

  isUpdateActivated = false;

  constructor(private courseService: TodoService, private store: Store<TodoStateApp>) { }

  ngOnInit(): void {
    this.todos = this.store.select(getAllTodos);
  }

  deleteTodo(todoId: string): void {
    this.store.dispatch(todoActionTypes.deleteTodo({todoId}));
  }

  showUpdateForm(todo: Todo): void {
    this.todoToBeUpdated = {...todo};
    this.isUpdateActivated = true;
  }

  updateTodo(updateForm): void {
    const update: Update<Todo> = {
      id: this.todoToBeUpdated.id,
      changes: {
        ...this.todoToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(todoActionTypes.updateTodo({update}));

    this.isUpdateActivated = false;
    this.todoToBeUpdated = null;
  }
}

/** NGRX TODO effects  */
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { todoActionTypes } from './todo.actions';
import { TodoService } from '../pages/home/service/todo.service';

@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActionTypes.loadTodos),
      concatMap(() => this.todoService.getAllTodos()),
      map(todos => todoActionTypes.todosLoaded({todos}))
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActionTypes.createTodo),
      concatMap((action) => this.todoService.createTodo(action.todo)),
      tap(() => this.router.navigateByUrl('/todo/list'))
    ),
    {dispatch: false}
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActionTypes.deleteTodo),
      concatMap((action) => this.todoService.deleteTodo(action.todoId))
    ),
    {dispatch: false}
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActionTypes.updateTodo),
      concatMap((action) => this.todoService.updateTodo(action.update.id, action.update.changes))
    ),
    {dispatch: false}
  );

  constructor(private todoService: TodoService, private actions$: Actions, private router: Router) {}
}

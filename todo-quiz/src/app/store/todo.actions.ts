
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';
import { Todo } from '../pages/home/models/todo.model';


export const loadTodos = createAction(
  '[Todos List] Load Todos via Service',
);

export const todosLoaded = createAction(
  '[Todos Effect] Todos Loaded Successfully',
  props<{todos: Todo[]}>()
);

export const createTodo = createAction(
  '[Create Todo Component] Create Todo',
  props<{todo: Todo}>()
);

export const deleteTodo = createAction(
  '[Todos List Operations] Delete Todo',
  props<{todoId: string}>()
);

export const updateTodo = createAction(
  '[Todos List Operations] Update Todo',
  props<{update: Update<Todo>}>()
);

export const todoActionTypes = {
  loadTodos,
  todosLoaded,
  createTodo,
  deleteTodo,
  updateTodo
};

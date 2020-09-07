
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { todoActionTypes } from './todo.actions';
import { Todo } from '../pages/home/models/todo.model';

export interface TodoState extends EntityState<Todo> {
  // [x: string]: any;
  todosLoaded: boolean;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState = adapter.getInitialState({
  todosLoaded: false
});

export const todoReducer = createReducer(
  initialState,

  on(todoActionTypes.todosLoaded, (state, action) => {
    return adapter.setAll(
      action.todos,
      {...state, todosLoaded: true}
    );
  }),

  on(todoActionTypes.createTodo, (state, action) => {
    return adapter.addOne(action.todo, state);
  }),

  on(todoActionTypes.deleteTodo, (state, action) => {
    return adapter.removeOne(action.todoId, state);
  }),

  on(todoActionTypes.updateTodo, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();

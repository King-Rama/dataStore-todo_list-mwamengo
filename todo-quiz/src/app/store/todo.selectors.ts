
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState, selectAll } from './todo.reducers';

export const todoFeatureSelector = createFeatureSelector<TodoState>('todos');

export const getAllTodos = createSelector(
  todoFeatureSelector,
  selectAll
);

export const areTodosLoaded = createSelector(
  todoFeatureSelector,
  state => state.todosLoaded
);

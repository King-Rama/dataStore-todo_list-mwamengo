/** Todo resolvers for preventing components loading before data */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, filter, first } from 'rxjs/operators';
import { loadTodos } from './todo.actions';
import { areTodosLoaded } from './todo.selectors';
import { TodoStateApp } from './reducers/index';

@Injectable()
export class TodoResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<TodoStateApp>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(areTodosLoaded),
        tap((TodosLoaded) => {
          if (!TodosLoaded) {
            this.store.dispatch(loadTodos());
          }

        }),
        filter(TodosLoaded => TodosLoaded),
        first()
    );
  }
}

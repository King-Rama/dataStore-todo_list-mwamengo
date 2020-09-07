import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Todo } from '../models/todo.model';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  /**
   * Adding content-type to the API endponts
   */
  private todoUrl = '../../../assets/json/todos.json';
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl).pipe(
      tap((_) => this.log('fetched All Todo')),
      catchError(this.handleError<Todo[]>('getAllTodo', []))
    );
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('/api/odos', todo).pipe(
      tap((_) => this.log('create Todo')),
      catchError(this.handleError<Todo[]>('createTodo', []))
    );
  }

  deleteTodo(TodoId: string): Observable<any> {
    return this.http.delete('/api/todos/' + TodoId).pipe(
      tap((_) => this.log('deleted todo')),
      catchError(this.handleError<Todo[]>('deleteTodo', []))
    );
  }

  updateTodo(TodoId: string | number, changes: Partial<Todo>): Observable<any> {
    return this.http.put('/api/todos/' + TodoId, changes).pipe(
      tap((_) => this.log('Updated Todo')),
      catchError(this.handleError<Todo[]>('updatedTodo', []))
    );
  }

  /**
   * Handle Http operation that failed.
   */
  private handleError<T>(operation = 'operation', result?: T): any {
    return (errors: any): Observable<T> => {
      console.error(errors);
      this.log(`${operation} failed: ${errors.message}`);
      return of(result as T);
    };
  }

  /** Log a Todo message with the MessageService */
  private log(message: string): any {
    // this.messageService.add(`MfiService: ${message}`);
  }
}

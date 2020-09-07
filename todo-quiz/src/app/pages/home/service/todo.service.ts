import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  /** API url configurations */
  todoUrl = '../../../assets/json/todos.json';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** Fetch all todos */
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl).pipe(
      tap((_) => this.log('fetched All Todo')),
      catchError(this.handleError<Todo[]>('getAllTodo', []))
    );
  }
  /** Create todos */
  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todoUrl, todo).pipe(
      tap((_) => this.log('create Todo')),
      catchError(this.handleError<Todo[]>('createTodo', []))
    );
  }

  /** delete todos */
  deleteTodo(todoId: string): Observable<any> {
    return this.http.delete(this.todoUrl + todoId).pipe(
      tap((_) => this.log('deleted todo')),
      catchError(this.handleError<Todo[]>('deleteTodo', []))
    );
  }

  /** update todos */
  updateTodo(todoId: string | number, changes: Partial<Todo>): Observable<any> {
    return this.http.put(this.todoUrl + todoId, changes).pipe(
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { TodoResolver } from '../../store/todo.resolver';
import { ListTodoComponent } from './component/list-todo/list-todo.component';
import { AddTodoComponent } from './component/add-todo/add-todo.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'todos/list',
        pathMatch: 'full',
        data: { title: 'Todo List' },
      },
      {
        path: 'todos/list',
        component: ListTodoComponent,
        resolve: {
          todos: TodoResolver,
        },
        data: { title: 'Todo List' },
      },
      {
        path: 'todos/add',
        component: AddTodoComponent,
        data: { title: 'Todo Add' },
      },
      { path: '**', redirectTo: 'todos/list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

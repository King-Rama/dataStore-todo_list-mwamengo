import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AddTodoComponent } from './component/add-todo/add-todo.component';
import { ListTodoComponent } from './component/list-todo/list-todo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [HomeComponent, AddTodoComponent, ListTodoComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [HomeComponent, ListTodoComponent, AddTodoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Title],
})
export class HomeModule { }

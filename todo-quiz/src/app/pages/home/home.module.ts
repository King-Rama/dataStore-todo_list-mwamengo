import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AddTodoComponent } from './component/add-todo/add-todo.component';
import { ListTodoComponent } from './component/list-todo/list-todo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { todoReducer } from '../../store/todo.reducers';
import { TodoEffects } from '../../store/todo.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [HomeComponent, AddTodoComponent, ListTodoComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('todos', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
    NgxPaginationModule,
  ],
  exports: [HomeComponent, ListTodoComponent, AddTodoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Title],
})
export class HomeModule {}

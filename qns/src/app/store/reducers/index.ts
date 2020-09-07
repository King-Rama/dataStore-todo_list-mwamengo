import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';


export interface TodoStateApp {

}

export const reducers: ActionReducerMap<TodoStateApp> = {

};


export const metaReducers: MetaReducer<TodoStateApp>[] = !environment.production ? [] : [];

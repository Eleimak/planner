import { Injectable } from '@angular/core';
import {Category} from '../model/category';
import {Task} from '../model/task';
import {Observable} from 'rxjs';
import {TaskDAOArrayImpl} from '../dao/impl/task-daoarray-impl';
import {CategoryDAOArrayImpl} from '../dao/impl/category-daoarray-impl';
import {Priority} from "../model/priority";

@Injectable()
export class DataHandlerService {

  private taskDaoArrayImpl = new TaskDAOArrayImpl();
  private categoryDaoArrayImpl = new CategoryDAOArrayImpl();

  constructor() {
  }
  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArrayImpl.getAll();
  }

  getAllCategories(): Observable<Category[]>{
    return  this.categoryDaoArrayImpl.getAll();
  }

  // поиск задач по параметрам
  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArrayImpl.search(category, searchText, status, priority);
  }
}

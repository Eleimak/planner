import { Injectable } from '@angular/core';
import {Category} from '../model/category';
import {Task} from '../model/task';
import {TestData} from '../data/test-data';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskDAOArrayImpl} from '../dao/impl/task-daoarray-impl';
import {CategoryDAOArrayImpl} from '../dao/impl/category-daoarray-impl';

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
}

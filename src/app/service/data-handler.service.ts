import { Injectable } from '@angular/core';
import {Category} from '../model/category';
import {Task} from '../model/task';
import {Observable} from 'rxjs';
import {TaskDAOArrayImpl} from '../dao/impl/task-daoarray-impl';
import {CategoryDAOArrayImpl} from '../dao/impl/category-daoarray-impl';
import {Priority} from "../model/priority";
import {PriorityDAOArrayImpl} from "../dao/impl/priority-daoarray-impl";

@Injectable()
export class DataHandlerService {

  private taskDaoArrayImpl = new TaskDAOArrayImpl();
  private categoryDaoArrayImpl = new CategoryDAOArrayImpl();
  private priorityDAOArrayImpl = new PriorityDAOArrayImpl();


  constructor() {
  }
  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArrayImpl.getAll();
  }

  getAllCategories(): Observable<Category[]>{
    return  this.categoryDaoArrayImpl.getAll();
  }

  getAllPriorities(): Observable<Priority[]>{
    return this.priorityDAOArrayImpl.getAll();
  }

  // поиск задач по параметрам
  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArrayImpl.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArrayImpl.update(task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArrayImpl.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArrayImpl.update(category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoArrayImpl.delete(id);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArrayImpl.add(task);
  }

  addCategory(title:string):Observable<Category>{
    return this.categoryDaoArrayImpl.add(new Category(null, title));
  }

  searchCategories(title: string): Observable<Category[]> {
    return this.categoryDaoArrayImpl.search(title);
  }
}

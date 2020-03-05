import { Injectable } from '@angular/core';
import {Category} from '../model/category';
import {Task} from '../model/task';
import {Observable, of} from 'rxjs';
import {TaskDAOArrayImpl} from '../dao/impl/task-daoarray-impl';
import {CategoryDAOArrayImpl} from '../dao/impl/category-daoarray-impl';
import {Priority} from "../model/priority";
import {PriorityDAOArrayImpl} from "../dao/impl/priority-daoarray-impl";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataHandlerService {

  //private taskDaoArrayImpl = new TaskDAOArrayImpl();
  //private categoryDaoArrayImpl = new CategoryDAOArrayImpl();
  //private priorityDAOArrayImpl = new PriorityDAOArrayImpl();


  constructor(
    //private http: HttpClient
  ) { }

/*
  getAllPriorities(): Observable<Priority[]>{
    //return this.priorityDAOArrayImpl.getAll();
    return this.http.get<Priority[]>('http://localhost:8080/api/priority/list');
  }

  addPriority(priority: Priority): Observable<Priority> {
    //return this.priorityDAOArrayImpl.add(priority);
    return this.http.post<Priority>('http://localhost:8080/api/priority/create', priority);
  }

  deletePriority(id: number): Observable<any> {
    //return this.priorityDAOArrayImpl.delete(id);
    return this.http.get('http://localhost:8080/api/priority/delete/' + id);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    //return this.priorityDAOArrayImpl.update(priority);
    return this.http.post<Priority>('http://localhost:8080/api/priority/update', priority);
  }
*/

/*
  getAllCategories(): Observable<Category[]>{
    return  this.categoryDaoArrayImpl.getAll();
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArrayImpl.update(category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoArrayImpl.delete(id);
  }

  addCategory(title:string):Observable<Category>{
    return this.categoryDaoArrayImpl.add(new Category(null, title));
  }

  searchCategories(title: string): Observable<Category[]> {
    return this.categoryDaoArrayImpl.search(title);
  }
  */
/*
  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArrayImpl.getAll();
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArrayImpl.update(task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArrayImpl.delete(id);
  }

  // поиск задач по параметрам
  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArrayImpl.search(category, searchText, status, priority);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArrayImpl.add(task);
  }

  // статистика
  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArrayImpl.getCompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoArrayImpl.getUncompletedCountInCategory(null);
  }
  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArrayImpl.getUncompletedCountInCategory(category);
  }
  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArrayImpl.getTotalCountInCategory(category);
  }*/
}

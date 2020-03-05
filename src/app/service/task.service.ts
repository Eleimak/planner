import { Injectable } from '@angular/core';
import {TaskDAOArrayImpl} from "../dao/impl/task-daoarray-impl";
import {CategoryDAOArrayImpl} from "../dao/impl/category-daoarray-impl";
import {PriorityDAOArrayImpl} from "../dao/impl/priority-daoarray-impl";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Priority} from "../model/priority";
import {Task} from "../model/task";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskDaoArrayImpl = new TaskDAOArrayImpl();

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArrayImpl.getAll();
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
  }
}

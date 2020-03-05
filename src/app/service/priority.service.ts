import { Injectable } from '@angular/core';
import {PriorityDAOArrayImpl} from "../dao/impl/priority-daoarray-impl";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Priority} from "../model/priority";

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private priorityDAOArrayImpl = new PriorityDAOArrayImpl();

  constructor(private http: HttpClient) { }

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

  getPriority(id: number): Observable<Priority> {
    //return this.priorityDAOArrayImpl.update(priority);
    return this.http.get<Priority>('http://localhost:8080/api/priority/get/' + id);
  }
}


import {Observable, of} from 'rxjs';
import {Priority} from '../../model/priority';
import {PriorityDAO} from '../interface/priority-dao';
import {TestData} from "../../data/test-data";

export class PriorityDAOArrayImpl implements PriorityDAO{
  add(T): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(T): Observable<Priority> {
    return undefined;
  }
}

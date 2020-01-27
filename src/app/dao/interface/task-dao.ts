import {CommonDAO} from './common-dao';
import {Task} from '../../model/task';
import {Category} from '../../model/category';
import {Observable} from 'rxjs';
import {Priority} from '../../model/priority';

export interface TaskDAO extends CommonDAO<Task> {
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;
  getCompletedCountInCategory(category: Category): Observable<number>;
  getUncompletedCountInCategory(category: Category): Observable<number>;
  getTotalCountInCategory(category: Category): Observable<number>;
  getTotalCount(): Observable<number>;
}

import {CategoryDAO} from '../interface/category-dao';
import {Category} from '../../model/category';
import {Observable} from 'rxjs';

export class CategoryDAOArratImpl implements CategoryDAO {
  add(T): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    return undefined;
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return undefined;
  }

  search(title: string): Observable<Category> {
    return undefined;
  }

  update(T): Observable<Category> {
    return undefined;
  }
}

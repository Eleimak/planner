import {CategoryDAO} from '../interface/category-dao';
import {Observable, of} from 'rxjs';
import {Category} from '../../model/category';
import {TestData} from '../../data/test-data';

export class CategoryDAOArrayImpl implements CategoryDAO {
  add(T): Observable<Category> {
    // если id пустой - генерируем его
    if (T.id === null || T.id === 0) {
      T.id = this.getLastIdCategory() + 1;
    }
    TestData.categories.push(T);
    return of(T);
  }

  // находит последний id (чтобы потом вставить новую запись с id, увеличенным на 1) - в реальной БД это происходит автоматически
  private getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(c => c.id));
  }

  delete(id: number): Observable<Category> {
    // перед удалением - нужно в задачах занулить все ссылки на удаленное значение
    // в реальной БД сама обновляет все ссылки (cascade update) - здесь нам приходится делать это вручную (т.к. вместо БД - массив)
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });
    const tmpCategory = TestData.categories.find(t => t.id === id); // удаляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);
    return of(tmpCategory);
  }

  get(id: number): Observable<Category> {
    return ;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return of(TestData.categories.filter(
      cat => cat.name.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.name.localeCompare(c2.name)));
  }

  update(T): Observable<Category> {
    const tmpCategory = TestData.categories.find(t => t.id === T.id); // обновляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, T);
    return of(tmpCategory);
  }
}

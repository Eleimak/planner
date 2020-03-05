import { Injectable } from '@angular/core';
import {CategoryDAOArrayImpl} from "../dao/impl/category-daoarray-impl";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category";
import {Priority} from "../model/priority";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryDaoArrayImpl = new CategoryDAOArrayImpl();

  constructor(private http: HttpClient) {
    this.saveAllCategories();
  }

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

  saveAllCategories(): Observable<any>{
     //this.categoryDaoArrayImpl.getAll();
    console.log("qqq" + this.categoryDaoArrayImpl.getAll());
    return this.http.post('http://localhost:8080/api/category/list/save', this.categoryDaoArrayImpl.getAll());
  }
}

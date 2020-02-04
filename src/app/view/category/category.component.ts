import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input()
  private categories: Category[];
  @Output()
  tellToSubscribers = new EventEmitter<Category>();
  selectedCategory: Category;

  constructor() {}

  ngOnInit() {
  //this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  showTasksByCategory(category: Category) {
    // если не изменилось значение, ничего не делать (чтобы лишний раз не делать запрос данных)
    if (this.selectedCategory === category) {
      return;
    }
    this.selectedCategory = category; // сохраняем выбранную категорию
    // вызываем внешний обработчик и передаем туда выбранную категорию
    this.tellToSubscribers.emit(this.selectedCategory);
  }

 /* getTasksByCategory(category: Category) {
    this.selected = category;
   //this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }
  showTasksByCategory(category: Category) {
    this.selected = category;
   // this.dataHandler.fetchTasksByCategory(category);
  }*/
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/category';
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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
  indexMouseMove: number;
  // удалили категорию
  @Output()
  deleteCategory = new EventEmitter<Category>();
  // изменили категорию
  @Output()
  updateCategory = new EventEmitter<Category>();

  constructor(private dialog: MatDialog) {}

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
  private showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  // диалоговое окно для редактирования категории
  private openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.name, 'Редактирование категории'],
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') { // нажали удалить
        this.deleteCategory.emit(category); // вызываем внешний обработчик
        return;
      }
      if (typeof (result) === 'string') { // нажали сохранить
        category.name = result as string;
        this.updateCategory.emit(category); // вызываем внешний обработчик
        return;
      }
    });
  }
}

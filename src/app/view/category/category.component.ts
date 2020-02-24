import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/category';
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OperType} from "../../dialog/oper-type.enum";

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
  @Input()
  selectedCategory: Category;
  // для отображения иконки редактирования при наведении на категорию
  private indexMouseMove: number;
  // удалили категорию
  @Output()
  deleteCategory = new EventEmitter<Category>();
  // изменили категорию
  @Output()
  updateCategory = new EventEmitter<Category>();
  // добавили категорию
  @Output()
  addCategory = new EventEmitter<string>(); // передаем только название новой категории
  // поиск категории
  @Output()
  searchCategory = new EventEmitter<string>(); // передаем строку для поиска

  searchCategoryTitle: string;

  constructor(private dialog: MatDialog) {
    this.showTasksByCategory(null);
  }

  ngOnInit() {

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

  private showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  // диалоговое окно для редактирования категории
  private openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.name, 'Редактирование категории', OperType.EDIT],
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
  // диалоговое окно для добавления категории
  private openAddDialog() {
    const dialogRef = this.dialog.open(
      EditCategoryDialogComponent, {data: ['', 'Добавление категории', OperType.ADD], width: '400px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result as string); // вызываем внешний обработчик
      }
    });
  }

  // поиск категории
  private search() {
    if (this.searchCategoryTitle == null ) {
      return;
    }
    this.searchCategory.emit(this.searchCategoryTitle);
  }
}

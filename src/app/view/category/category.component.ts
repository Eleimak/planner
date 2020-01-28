import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  selected: Category;

  constructor(private dataHandler: DataHandlerService) {  }

  ngOnInit() {
  this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }
  getTasksByCategory(category: Category) {
    this.dataHandler.getTasks().filter(task => task.category === category);
  }
  showTasksByCategory(category: Category) {
    this.selected = category;
    this.dataHandler.fetchTasksByCategory(category);
  }
}

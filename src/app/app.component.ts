import { Component } from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/category";
import {Task} from "./model/task";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'planner';

  tasks: Task[];
  categories: Category[];

  private selectedCategory: Category = null;

  constructor(
    private dataHandler: DataHandlerService // фасад для работы с данными
  ) {}

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    //this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.onSelectCategory(null);
  }

  private onSelectCategory(category: Category) {
    console.log("onSelectCategory");
    this.selectedCategory = category;
    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks;
    });

  }

  openEditTaskDialog(task: Task) {

    console.log(task);
  }
}

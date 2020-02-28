import {Component, Input, OnInit} from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/category";
import {Task} from "./model/task";
import {Priority} from "./model/priority";
import {zip} from "rxjs";
import {concatMap, map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Planner';

  private tasks: Task[];
  private categories: Category[];
  private priorities: Priority[]; // все приоритеты

  private selectedCategory: Category = null;

  // поиск
  private searchTaskText = ''; // текущее значение для поиска задач
  // фильтрация
  private statusFilter: boolean;
  private priorityFilter: Priority;
  private searchCategoryText: string;

  // статистика
  private totalTasksCountInCategory: number;
  private completedCountInCategory: number;
  private uncompletedCountInCategory: number;
  private uncompletedTotalTasksCount: number;

  // коллекция категорий с кол-вом незавершенных задач для каждой из них
  private categoryMap = new Map<Category, number>();

  constructor(
    private dataHandler: DataHandlerService // фасад для работы с данными
  ) {}

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.fillCategories();
    this.onSelectCategory(null); // показать все задачи
  }

  // изменение категории
  private onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
    this.updateTasksAndStat();
  }

  /*// обновление задачи
  openEditTaskDialog(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
    this.updateTasksAndStat();
  }*/

  // обновление задачи
  private openEditTaskDialog(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.fillCategories();
      this.updateTasksAndStat();
    });

  }

/*  // удаление задачи
  private onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }*/
  // удаление задачи
  private onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).pipe(
      concatMap(task => {
          return this.dataHandler.getUncompletedCountInCategory(task.category)
            .pipe(map(count => { return ({t: task, count}); }));
        })).subscribe(result => {
      const t = result.t as Task;
      this.categoryMap.set(t.category, result.count);
      this.updateTasksAndStat();
    });
  }

/*  // удаление категории
  private onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null; // открываем категорию "Все"
      this.onSelectCategory(this.selectedCategory);
    });
  }
  */
  // удаление категории
  private onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null; // открываем категорию "Все"
      this.categoryMap.delete(cat); // не забыть удалить категорию из карты
      this.onSearchCategory(this.searchCategoryText);
      this.updateTasks();
    });
  }


  // обновлении категории
  private onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  // поиск задач
  private onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  // фильтрация задач по статусу (все, решенные, нерешенные)
  private onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

 private updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter,
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onFilterByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }

/*
  // добавление задачи
  private onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasks();
    });
  }
*/
  // добавление задачи
  private onAddTask(task: Task) {
    this.dataHandler.addTask(task).pipe(// сначала добавляем задачу
      concatMap(task => { // используем добавленный task (concatMap - для последовательного выполнения)
          // .. и считаем кол-во задач в категории с учетом добавленной задачи
          return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
            return ({t: task, count}); // в итоге получаем массив с добавленной задачей и кол-вом задач для категории
          }));
        }
      )).subscribe(result => {
      const t = result.t as Task;
      // если указана категория - обновляем счетчик для соотв. категории
      if (t.category) {
        this.categoryMap.set(t.category, result.count);
      }
      this.updateTasksAndStat();
    });
  }

  // добавление категории
  private onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());
  }

  // заполняет категории и кол-во невыполненных задач по каждой из них (нужно для отображения категорий)
  private fillCategories() {
    if (this.categoryMap) {
      this.categoryMap.clear();
    }
    this.categories = this.categories.sort((a, b) => a.name.localeCompare(b.name));
    // для каждой категории посчитать кол-во невыполненных задач
    this.categories.forEach(cat => {
      this.dataHandler.getUncompletedCountInCategory(cat).subscribe(count => this.categoryMap.set(cat, count));
    });
  }

  private updateCategories() {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  // поиск категории
  private onSearchCategory(title: string) {
    this.searchCategoryText = title;
    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  private updateTasksAndStat() {

    this.updateTasks(); // обновить список задач

    // обновить переменные для статистики
    this.updateStat();

  }

  // обновить статистику
  private updateStat() {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount())
      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3]; // нужно для категории Все
      });
  }
}

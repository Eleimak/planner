import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Task } from '../../model/task';
import { DataHandlerService } from '../../service/data-handler.service';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Priority} from "../../model/priority";
import {Category} from "../../model/category";
import {OperType} from "../../dialog/oper-type.enum";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit {
  private tasks: Task[];
  private priorities: Priority[]; // список приоритетов (для фильтрации задач)
  private pages: number[]=[10, 5, 25, 50, 100];
  // поиск
  private searchTaskText: string; // текущее значение для поиска задач
  private selectedStatusFilter: boolean = null;   // по-умолчанию будут показываться задачи по всем статусам (решенные и нерешенные)
  private selectedPriorityFilter: Priority = null;   // по-умолчанию будут показываться задачи по всем приоритетам

  @Input('tasks')
  private set setTasks(tasks: Task[]) { // напрямую не присваиваем значения в переменную, только через @Input
    this.tasks = tasks;
    this.refreshTable();
  }
  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }
  @Input()
  selectedCategory: Category;

  @Output()
  selectCategory = new EventEmitter<Category>(); // нажали на категорию из списка задач
  @Output()
  updateTask = new EventEmitter<Task>();
  @Output()
  deleteTask = new EventEmitter<Task>();
  @Output()
  filterByTitle = new EventEmitter<string>();
  @Output()
  filterByStatus = new EventEmitter<boolean>();
  @Output()
  filterByPriority = new EventEmitter<Priority>();
  @Output()
  addTask = new EventEmitter<Task>();

  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  displayedColumns: string[] = ['id', 'name', 'category', 'priority', 'completed', 'date', 'operations'];
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы
  // ссылки на компоненты таблицы
  @ViewChild(MatSort, {static: false})
  private sort: MatSort;
  @ViewChild(MatPaginator, {static: false})
  private paginator: MatPaginator;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
   // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    this.dataSource = new MatTableDataSource();
    this.refreshTable();
  }

  ngAfterViewInit(): void {
    this.addTableObjects();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  private refreshTable() {
    if(!this.dataSource){
      return;
    }
    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)
    this.addTableObjects();
      // когда получаем новые данные..
      // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
      // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {
        // по каким полям выполнять сортировку для каждого столбца
        switch (colName) {
          case 'priority': {
            return task.priority ? task.priority.id : null;
          }
          case 'category': {
            return task.category ? task.category.name : null;
          }
          case 'date': {
            return task.date ? task.date : null;
          }
          case 'name': {
            return task.name;
          }
        }
      };
  }
  private addTableObjects() {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }
  // диалоговое редактирования для добавления задачи
  private openEditTaskDialog(task: Task): void {
    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи', OperType.ADD],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // обработка результатов
      if (result === 'complete') {
        task.completed = true; // ставим статус задачи как выполненная
        this.updateTask.emit(task);
      }
      if (result === 'activate') {
        task.completed = false; // возвращаем статус задачи как невыполненная
        this.updateTask.emit(task);
        return;
      }
      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }
      if (result as Task) { // если нажали ОК и есть результат
        this.updateTask.emit(task);
        return;
      }
    });
  }

  onClickTask(task: Task) {
    this.updateTask.emit(task);
  }

  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Подтвердите действие', message: `Вы действительно хотите удалить задачу: "${task.name}"?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК
        this.deleteTask.emit(task);
      }
    });
  }

  private onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  // фильтрация по названию
  private onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText);
  }

  // фильтрация по статусу
  private onFilterByStatus(value: boolean) {
    // на всякий случай проверяем изменилось ли значение (хотя сам гуишный компонент должен это делать)
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  // фильтрация по приоритету
  private onFilterByPriority(value: Priority) {
    // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  // диалоговое окно для добавления задачи
  private openAddTaskDialog() {
    // то же самое, что и при редактировании, но только передаем пустой объект Task
    const task = new Task(null, '', false, null, this.selectedCategory);
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Добавление задачи', OperType.ADD]});
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК и есть результат
        this.addTask.emit(task);
      }
    });
  }
}

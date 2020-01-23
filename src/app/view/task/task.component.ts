import {Component, OnInit, ViewChild} from '@angular/core';
import { Task } from '../../model/task';
import { DataHandlerService } from '../../service/data-handler.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[];
  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  displayedColumns: string[] = ['id', 'name', 'category', 'priority', 'completed', 'date'];
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  // ссылки на компоненты таблицы
  @ViewChild(MatSort, {static: false})
  private sort: MatSort;
  @ViewChild(MatPaginator, {static: false})
  private paginator: MatPaginator;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    //  this.tasks = this.dataHandler.getTasks();
    this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks);
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    this.dataSource = new MatTableDataSource();
    this.refreshTable();
  }

  ngAfterViewInit(): void {
    this.addTableObjects();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  private refreshTable() {
    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)
  }

  private addTableObjects() {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'taskDate'
})

export class TaskDatePipe implements PipeTransform {
  yesterday: Date;
  transform(date: Date | string, format: string = 'mediumDate'): string { // mediumDate - форматирование по-умолчанию

    this.yesterday = new Date(date);
    if (date == null) {
      return 'Без срока';
    }
    date = new Date(date);

    if (date.getDate() === new Date().getDate()) {
      return 'Сегодня';
    }
    if (this.yesterday.setDate(this.yesterday.getDate() - 1) === new Date().getDate()) {
      return 'Вчера';
    }
    this.yesterday = date;
    if (this.yesterday.setDate(this.yesterday.getDate() + 1) === new Date().getDate()) {
      return 'Завтра';
    }
    return new DatePipe('ru-RU').transform(date, format); // показывать дату в нужной локали
  }
}

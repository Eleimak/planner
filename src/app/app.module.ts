import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoryComponent } from './view/category/category.component';
import { DataHandlerService } from './service/data-handler.service';
import { TaskComponent } from './view/task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatPaginatorModule,
         MatSortModule, MatTableModule,
         MatDialogModule, MatInputModule,
         MatButtonModule, MatIconModule,
         MatOptionModule, MatDatepickerModule,
         MatNativeDateModule, MatSelectModule} from '@angular/material';
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { TaskDatePipe } from './pipe/task-date.pipe';

import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { EditCategoryDialogComponent } from './dialog/edit-category-dialog/edit-category-dialog.component';
import { FooterComponent } from './view/footer/footer.component';
import { AboutDialogComponent } from './dialog/about-dialog/about-dialog.component';
import { HeaderComponent } from './view/header/header.component';
import { StatComponent } from './view/stat/stat.component';
import { StatCardComponent } from './view/stat/stat-card/stat-card.component';
import {ColorPickerModule} from "ngx-color-picker";
import { SettingsDialogComponent } from './dialog/settings-dialog/settings-dialog.component';
import { PrioritiesComponent } from './view/header/priorities/priorities.component';
import { EditPriorityDialogComponent } from './dialog/edit-priority-dialog/edit-priority-dialog.component';
registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    TaskComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryDialogComponent,
    FooterComponent,
    AboutDialogComponent,
    HeaderComponent,
    StatComponent,
    StatCardComponent,
    SettingsDialogComponent,
    PrioritiesComponent,
    EditPriorityDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  providers: [DataHandlerService],
  entryComponents: [
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    EditCategoryDialogComponent,
    AboutDialogComponent,
    SettingsDialogComponent,
    EditPriorityDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

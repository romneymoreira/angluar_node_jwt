import { TodosRoutingModule } from './todos-routing.module';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { TodosComponent } from './todos.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../shared';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [CommonModule, Ng2Charts, DataTablesModule,
    TodosRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, ModalModule.forRoot()],
  declarations: [TodosComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TodosModule { }

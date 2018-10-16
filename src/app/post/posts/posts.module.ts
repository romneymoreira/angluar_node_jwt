import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { PageHeaderModule } from '../../shared';
import { PostComponent } from './post.component';
import { PostsRoutingModule } from './posts-routing.module';
import { ModalDirective } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    Ng2Charts, DataTablesModule,
    PostsRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, ModalModule.forRoot()],
  declarations: [PostComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PostsModule { }

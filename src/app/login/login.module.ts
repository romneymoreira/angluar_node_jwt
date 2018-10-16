import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../shared';

@NgModule({
    imports: [CommonModule, Ng2Charts, LoginRoutingModule, PageHeaderModule, FormsModule, ModalModule.forRoot()],
    declarations: [LoginComponent]
})
export class LoginModule {}

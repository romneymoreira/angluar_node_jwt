import { DataTable } from './../datatable/components/table/table.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PostService } from '../shared/services/post.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { successMessage } from '../shared/services/iziToast.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
    @ViewChild('childModal') public childModal: ModalDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: any = new Subject();
    todos: any[];
    todo: any;
    formtodos: FormGroup;
    btnedit: boolean;
    btnnew: boolean;
  constructor(private postservice: PostService, public router: Router, private formBuilder: FormBuilder) {
    this.btnedit = false;
    this.btnnew = false;
    this.todo = {
        title: '',
        id: 0,
        userId: 0,
        completed: false
    };
   }


  ngOnInit() {
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
    this.formtodos = this.formBuilder.group({
        title: [null, Validators.required],
        completed: [null, null]
    });
    this.postservice
    .getAllTodos()
    .subscribe(result => {
      this.todos = result;
      this.dtTrigger.next();
    },
    err => {
      console.log(err);
      if (err.status     === 403) {
        this.router.navigate(['login']);
      }
    });
  }

  show(item: any) {
    this.btnedit = true;
    this.btnnew = false;
    this.todo = item;
    this.childModal.show();
  }
  hide() {
    this.childModal.hide();
  }

  save() {
    this.childModal.hide();
    successMessage('Has been saved!');
  }

  newPost() {
    this.btnedit = false;
    this.btnnew = true;
    this.todo = {
        title: '',
        id: 0,
        userId: 0,
        completed: false
    };
    this.childModal.show();
}

saveNew() {
    if (this.formtodos.valid) {
        const last = _.last(this.todos);
        this.todo.id = last.id + 1;
        this.todo.userId = 10;
        this.todos.push(this.todo);
        this.childModal.hide();
        successMessage('Has been saved!');
    } else {
        this.validarTodosCampos(this.formtodos);
    }
}
    campoValido(campo: string) {
        return (
            !this.formtodos.get(campo).valid &&
            this.formtodos.get(campo).touched
        );
    }

    mostrarCSSErro(campo: string) {
        return {
            'has-error': this.campoValido(campo),
            '': this.campoValido(campo)
        };
    }

    validarTodosCampos(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validarTodosCampos(control);
            }
        });
    }
}


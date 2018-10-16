import { Component, OnInit, ViewChild } from "@angular/core";
import { PostService } from "../../shared/services/post.service";
import { ModalDirective } from "ngx-bootstrap";
import { Router } from "@angular/router";
import * as _ from 'lodash';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from "@angular/forms";
import { Subject } from "rxjs";
import { successMessage } from "../../shared/services/iziToast.service";

interface Posts {
    userId?: number;
    id?: number;
    title?: string;
    body?: boolean;
  }

@Component({
    selector: "app-post",
    templateUrl: "./post.component.html",
    styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {
    @ViewChild('childModal') public childModal: ModalDirective;

    dtOptions: DataTables.Settings = {};
    dtTrigger: any = new Subject();
    formpostsValid: boolean;
    formposts: FormGroup;
    posts: any[];
    post: any;
    btnedit: boolean;
    btnnew: boolean;
    constructor(
        private postservice: PostService,
        public router: Router,
        private formBuilder: FormBuilder
    ) {
        this.btnedit = false;
        this.btnnew = false;
        this.post = {
            title: '',
            id: 0,
            userId: 0,
            body: ''
        };
    }
    newPost() {
        this.btnedit = false;
        this.btnnew = true;
        this.post = {
            title: '',
            id: 2,
            userId: 3,
            body: ''
        };
        this.childModal.show();
    }

    saveNew() {
        if (this.formposts.valid) {
            const last = _.last(this.posts);
            this.post.id = last.id + 1;
            this.posts.push(this.post);
            this.childModal.hide();
            successMessage('Has been saved!');
        } else {
            this.validarTodosCampos(this.formposts);
        }
    }

    show(item: any) {
        this.btnedit = true;
        this.btnnew = false;
        this.post = item;
        this.childModal.show();
    }
    hide() {
        this.childModal.hide();
    }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10
          };
        this.formposts = this.formBuilder.group({
            title: [null, Validators.required],
            body: [null, Validators.required]
        });
        this.postservice.getAllPosts().subscribe(
            result => {
                this.posts = result;
                this.dtTrigger.next();
            },
            err => {
                console.log(err);
                if (err.status === 403) {
                    this.router.navigate(['login']);
                }
            }
        );
    }

    save() {
        if (this.formposts.valid) {
            this.childModal.hide();
            successMessage('Has been saved!');
        } else {
            this.validarTodosCampos(this.formposts);
        }
    }

    campoValido(campo: string) {
        return (
            !this.formposts.get(campo).valid &&
            this.formposts.get(campo).touched
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

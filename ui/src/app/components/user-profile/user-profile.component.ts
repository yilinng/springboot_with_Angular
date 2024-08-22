import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { TodoService } from 'src/app/Service/todo.service';
import { UserEntry, TodoEntry } from '../../types/types';
//import { map, filter } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-user-profile',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '300px',
        opacity: 1,
      //  backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '0',
        opacity: 0.1,
      //  backgroundColor: 'blue'
      })),
      /*
      transition('* => *', [
        animate('1s', keyframes ( [
          style({ opacity: 0.1, offset: 0.1 }),
        //  style({ opacity: 0.6, offset: 0.2 }),
          style({ opacity: 1,   offset: 0.5 }),
        //  style({ opacity: 0.2, offset: 0.7 })
        ]))
      ]),
      */
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
      
    ]),
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
  
//https://stackoverflow.com/questions/44900769/angular-wait-until-i-receive-data-before-loading-template  
export class UserProfileComponent implements OnInit {
  currentUser: UserEntry | undefined;
  todos: TodoEntry[] = [];
  todo!: TodoEntry | undefined;
  clickTodo: Boolean = false;
  showUser: Boolean = true;
  editTodo: Boolean = false;
  addTodoForm: FormGroup;

  constructor(
    private authService: AuthService,
    private todoService: TodoService,
    private actRoute: ActivatedRoute,
    public fb: FormBuilder,
  ) { 
    this.addTodoForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      user: [this.currentUser && this.currentUser.id, Validators.required]
    });

    this.addTodoForm.controls["title"].valueChanges.subscribe(value => {
     // console.log('addTodoForm.controls["title"]', value);
      if (this.todo !== undefined) {
        this.todo.title = value;
      }
    });

    this.addTodoForm.controls["content"].valueChanges.subscribe(value => {
    //  console.log('addTodoForm.controls["content"]', value);
      if (this.todo !== undefined) {
        this.todo.content = value;
      }
    });
  }
  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
   // let id = localStorage.getItem('user_id');s
    this.authService.getUserProfile()
      .subscribe((res) => {
        this.currentUser = res;
        this.todos = res.todos;
      });
  }

  submitted = false

  onSubmit() {
    if (this.todo != undefined) {
      this.update();
    } else {   
      this.todoService.addTodo(this.addTodoForm.value).subscribe((todo) => this.todos.push(todo));
      this.newTodo();
    }
  }


  delete(todo: TodoEntry): void {
    if (window.confirm('Want to delete?')) {
      this.todos = this.todos.filter((h) => h !== todo);
     // console.log('hero delete', todo)
      this.todoService.deleteTodo(todo).subscribe();
    }

  }

  update(): void {
    if (this.todo !== undefined) {
      // console.log('hero delete', todo)
      this.todoService.updateTodo(this.todo).subscribe();
    }
  }

  editForm(todo: TodoEntry): void {
    this.editTodo = true;
    this.clickTodo = true;
    this.showUser = false;
    this.todo = todo;
    this.resetForm();
  }

  //https://stackoverflow.com/questions/40934763/how-do-i-get-the-value-of-a-nested-formbuilder-group
  resetForm(): void {
    console.log(" resetForm this.todos", this.todos);
    if (this.todo !== undefined) {    
      this.addTodoForm.controls["title"].setValue(this.todo.title);
      this.addTodoForm.controls["content"].setValue(this.todo.content);
    }
  }

  showTodo() {
    console.log("showTodo", this.todos);
    this.todo = undefined;
    this.newTodo();
    this.showUser = false;
    this.clickTodo = true;
    this.editTodo = false;
  }

  clickUser() {
    this.clickTodo = false;
    this.showUser = true;
    this.editTodo = false;
  }

  checkValue() {
    if (this.addTodoForm.value.title && this.addTodoForm.value.content) {
      return false
    }
    return true
  }

  newTodo() {
    if (this.todo === undefined) {
      console.log("newTodo_this.todo init", this.todo);
      this.addTodoForm.reset();
      console.log(" newTodo_this.todo after", this.todo);
    }
  }

  truncateString(str: string, num: number) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }


}

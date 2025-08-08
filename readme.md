https://chatgpt.com/share/68959da6-25d0-8009-9065-91ac9a9da149



<form [formGroup]="form" (ngSubmit)="submit()">

  <input placeholder="First Name" formControlName="firstName">
  <div *ngIf="form.get('firstName')?.touched && form.get('firstName')?.invalid">
    First Name is required.
  </div><br>

  <input placeholder="Last Name" formControlName="lastName">
  <div *ngIf="form.get('lastName')?.touched && form.get('lastName')?.invalid">
    Last Name is required.
  </div><br>

  <input type="date" formControlName="dob">
  <div *ngIf="form.get('dob')?.touched && form.get('dob')?.invalid">
    Date of Birth is required.
  </div><br>

  <label><input type="radio" value="Male" formControlName="gender"> Male</label>
  <label><input type="radio" value="Female" formControlName="gender"> Female</label>
  <div *ngIf="form.get('gender')?.touched && form.get('gender')?.invalid">
    Gender is required.
  </div><br>

  <input placeholder="Mobile Number" formControlName="mobile">
  <div *ngIf="form.get('mobile')?.touched && form.get('mobile')?.invalid">
    <div *ngIf="form.get('mobile')?.errors?.['required']">Mobile number is required.</div>
    <div *ngIf="form.get('mobile')?.errors?.['pattern']">Enter 8–10 digit number only.</div>
  </div><br>

  <input placeholder="Address" formControlName="address">
  <div *ngIf="form.get('address')?.touched && form.get('address')?.invalid">
    Address is required.
  </div><br>

  <input placeholder="Email" formControlName="email">
  <div *ngIf="form.get('email')?.touched && form.get('email')?.invalid">
    <div *ngIf="form.get('email')?.errors?.['required']">Email is required.</div>
    <div *ngIf="form.get('email')?.errors?.['email']">Invalid email format.</div>
  </div><br>

  <input type="password" placeholder="Password" formControlName="password">
  <div *ngIf="form.get('password')?.touched && form.get('password')?.invalid">
    <div *ngIf="form.get('password')?.errors?.['required']">Password is required.</div>
    <div *ngIf="form.get('password')?.errors?.['pattern']">
      Must be at least 6 chars, 1 uppercase, 1 number.
    </div>
  </div><br>

  <input type="password" placeholder="Confirm Password" formControlName="confirmPassword">
  <div *ngIf="form.get('confirmPassword')?.touched && form.get('confirmPassword')?.invalid">
    Confirm Password is required.
  </div>
  <div *ngIf="form.get('confirmPassword')?.touched && form.value.password !== form.value.confirmPassword">
    Passwords do not match.
  </div><br>

  <label>
    <input type="checkbox" formControlName="declaration">
    I confirm that all details are correct
  </label>
  <div *ngIf="form.get('declaration')?.touched && form.get('declaration')?.invalid">
    You must accept the declaration.
  </div><br>

  <button type="submit" [disabled]="form.invalid">Submit</button>
</form>












https://chatgpt.com/share/6895935a-4584-8009-b13c-b29fa39f9f8d

Here’s the complete Angular 19 Standalone Todo App with a clean folder structure and working code.


---

✅ Project Setup

ng new todo-app --standalone --routing
cd todo-app

ng g c components/todo-list --standalone
ng g c components/add-todo --standalone
ng g s services/todo
ng g interface models/todo


---

✅ Folder Structure

src/
  app/
    components/
      todo-list/
        todo-list.component.ts
        todo-list.component.html
        todo-list.component.scss
      add-todo/
        add-todo.component.ts
        add-todo.component.html
        add-todo.component.scss
    services/
      todo.service.ts
    models/
      todo.ts
    app.config.ts
    main.ts


---

✅ models/todo.ts

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}


---

✅ services/todo.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();

  private idCounter = 1;

  addTodo(title: string) {
    const newTodo: Todo = {
      id: this.idCounter++,
      title,
      completed: false,
    };
    this.todos.next([...this.todos.value, newTodo]);
  }

  toggleTodo(id: number) {
    const updated = this.todos.value.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.todos.next(updated);
  }

  deleteTodo(id: number) {
    const filtered = this.todos.value.filter(todo => todo.id !== id);
    this.todos.next(filtered);
  }
}


---

✅ components/add-todo/add-todo.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo.component.html'
})
export class AddTodoComponent {
  title = '';

  constructor(private todoService: TodoService) {}

  add() {
    if (this.title.trim()) {
      this.todoService.addTodo(this.title);
      this.title = '';
    }
  }
}

add-todo.component.html

<input [(ngModel)]="title" placeholder="Enter todo" />
<button (click)="add()">Add</button>


---

✅ components/todo-list/todo-list.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos$;
  }

  toggle(id: number) {
    this.todoService.toggleTodo(id);
  }

  remove(id: number) {
    this.todoService.deleteTodo(id);
  }
}

todo-list.component.html

<ul>
  <li *ngFor="let todo of todos$ | async">
    <input type="checkbox" [checked]="todo.completed" (change)="toggle(todo.id)" />
    <span [style.textDecoration]="todo.completed ? 'line-through' : 'none'">
      {{ todo.title }}
    </span>
    <button (click)="remove(todo.id)">x</button>
  </li>
</ul>


---

✅ main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));


---

✅ app.component.ts

import { Component } from '@angular/core';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddTodoComponent, TodoListComponent],
  template: `
    <h1>Todo App</h1>
    <app-add-todo></app-add-todo>
    <app-todo-list></app-todo-list>
  `
})
export class AppComponent {}


---

✅ app.config.ts

import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: []
};


---

This is a complete standalone Angular 19 Todo App with proper separation of logic, service-based state management, and no external backend. Ready for machine test submission.

Would you like a downloadable .zip version or add persistent localStorage support?













# Polling System

This is a simple **Polling System** built using **Node.js**, **Express**, **JWT Authentication**, and **MongoDB** on the backend, with a basic **HTML + JavaScript (Vanilla)** frontend.

> The frontend and backend logic were scaffolded with the help of **ChatGPT** to speed up development and improve structure.

---

##  Features

- User **Registration** and **Login** (Admin/User)
- **JWT-based Authentication**
- **Admin-only** Poll Creation
- **Public & Private** Polls
- **User Voting** with result view
- Polls **expire in 2 hours**
- **Protected Routes** using roles and tokens
- Simple and clean **HTML + JS Frontend**

---

##  Technologies Used

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (`jsonwebtoken`)  
- bcrypt  
- dotenv  
- CORS  
- nodemon  

### Frontend
- HTML  
- Vanilla JavaScript  

---

##  Authentication (JWT)

- Upon **login**, a JWT token is generated using `jsonwebtoken` and sent to the client.
- All **protected routes** (like `/createPoll`, `/vote/:id/:index`) must pass the token in the request **Authorization Header**.
- Role-based middleware ensures **admins** can create/edit/delete polls and **users** can vote/view results only.

---

##  AI Tool Usage (ChatGPT)

This project was enhanced using **ChatGPT** for:

- Some architectural ideas, backend practices were inspired by my previous projects in Git
- Implementing **JWT and role-based protection**
- Creating a simple and functional **frontend** (login, register, dashboard, vote)
- Improving error handling and UX
- Drafting this README file

---

##  Screen Recording

[[screen recording link]](https://drive.google.com/file/d/10Q20J9e4poPfrKKtmo0kwAKLTVsAfG3m/view?usp=sharing)

---

##  Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/VidhunKr/polling_System_official
cd polling-backend

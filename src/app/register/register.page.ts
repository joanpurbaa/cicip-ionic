import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Task {
  id: number;
  description: string;
  icon: string;
  time: string;
  completed: boolean;
}

interface User {
  username: string;
  email: string;
  password: string;
  tasks: Task[];
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  user: User[] = [];
  username: string = '';
  email: string = '';
  password: string = '';
  isEmailUsed: boolean = false;

  constructor(private router: Router) {}

  register() {
    if (this.user.some((data) => data.email == this.email)) {
      this.isEmailUsed = true;
    } else {
      this.user.push({
        username: this.username,
        email: this.email,
        password: this.password,
        tasks: [],
      });

      this.isEmailUsed = false;

      localStorage.setItem('user', JSON.stringify(this.user));

      this.router.navigate(['masuk']);
    }
  }
}

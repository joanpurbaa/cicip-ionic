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
    const storedUser = JSON.parse(localStorage.getItem('user') || '[]');

    this.user = Array.isArray(storedUser) ? storedUser : [];

    if (this.user.some((data) => data.email == this.email)) {
      this.isEmailUsed = true;

      return;
    }

    const userData: User = {
      username: this.username,
      email: this.email,
      password: this.password,
      tasks: [],
    };

    this.isEmailUsed = false;

    this.user.push(userData);

    localStorage.setItem('user', JSON.stringify(this.user));

    this.router.navigate(['masuk']);
  }
}

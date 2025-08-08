import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  user: User[] = [];
  email: string = '';
  password: string = '';
  isValidCredential: boolean = false;

  constructor(private router: Router) {}

  login() {
    this.user = JSON.parse(localStorage.getItem('user') || '');

    console.log(this.user);

    if (
      this.user.some(
        (data) => data.email == this.email && data.password == this.password
      )
    ) {
      this.isValidCredential = false;

      localStorage.setItem('token', this.email);

      this.router.navigate(['home']);
    } else {
      this.isValidCredential = true;
    }
  }
}

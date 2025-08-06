import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
  standalone: false,
})
export class SplashScreenPage implements OnInit {
  title: string = '';
  description: string = '';
  circle: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.title = 'Jadwalin';
    }, 2000);

    setTimeout(() => {
      this.description = 'Your outdoor partner scheduler';
    }, 4000);

    setTimeout(() => {
      this.circle = true;
    }, 6000);

    setTimeout(() => {
      this.router.navigate(['landing-page']);
    }, 8000);
  }
}

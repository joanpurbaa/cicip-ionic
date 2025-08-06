import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
  standalone: false,
})
export class LandingPagePage implements OnInit {
  image: string = '';
  description: string = '';

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.image = 'assets/schedule.gif';
      this.description = 'Atur jadwal kegiatan harian kamu';
    }, 0);

    setTimeout(() => {
      this.image = 'assets/temperature.gif';
      this.description = 'Cari tau suhu disekitar kamu secara real time';
    }, 4000);

    setTimeout(() => {
      this.image = 'assets/weather.gif';
      this.description = 'Kasih informasi cuaca secara berkala';
    }, 8000);
  }
}

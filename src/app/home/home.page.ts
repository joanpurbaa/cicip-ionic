import { Component } from '@angular/core';
import { WeatherService } from '../service/weather.service';

interface Tasks {
  id: number;
  description: string;
  icon: string;
  time: string;
  completed: boolean;
}

interface Users {
  username: string;
  email: string;
  password: string;
  tasks: Tasks[];
}

interface WeatherData {
  location: any;
  current: any;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  // user
  users: Users[] = [];
  currentUser: Users | null = null;

  // tasks
  task: Tasks[] | null | any = null;
  taskDescription = '';
  time = '';
  icon = '';
  editingTaskId: number | null = null;

  // weather
  currentTemp = '';
  currentTime: any = '';
  currentWeather = '';
  currentWeatherCity = '';
  currentWeatherIcon = '';
  currentWeatherByHour: any = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.loadTasks();
    this.loadWeather();
  }

  loadCurrentUser() {
    const users = JSON.parse(localStorage.getItem('user') || '');
    const token = localStorage.getItem('token');

    if (typeof users == 'object') {
      users.forEach((data: any) => {
        if (data.email == token) {
          this.currentUser = data;
        }
      });
    }

  }

  loadTasks() {
    this.task = this.currentUser;
  }

  loadWeather() {
    this.weatherService.getWeatherByCity('medan').subscribe({
      next: (data: any) => {
        const weatherData = data as WeatherData;

        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');

        this.currentWeather = weatherData.current.condition.text;
        this.currentWeatherCity = weatherData.location.name;
        this.currentWeatherIcon = weatherData.current.condition.icon;
        this.currentTemp = weatherData.current.temp_c;
        this.currentTime = `${hours}:${minutes}`;
      },
      error: (err) => {
        console.log('gagal mendapatkan data cuaca');
      },
    });
  }

  saveTasks() {
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

  addTasks() {
    if (!this.taskDescription.trim()) return;

    if (this.editingTaskId !== null) {
      const taskIndex = this.currentUser?.tasks.findIndex(
        (t) => t.id == this.editingTaskId
      );

      if (taskIndex !== undefined && taskIndex !== -1 && this.currentUser) {
        this.currentUser.tasks[taskIndex].description = this.taskDescription;
        this.currentUser.tasks[taskIndex].time = this.time;

        this.saveTasks();

        this.taskDescription = '';
        this.time = '';
        this.editingTaskId = null;
      }
    } else {
      this.weatherService.getWeatherForecast('medan').subscribe({
        next: (data: any) => {
          const hourIndex = Number(this.time.split(':')[0]);
          const icon =
            data.forecast.forecastday[0].hour[hourIndex].condition.icon;

          const newTask: Tasks = {
            id: Date.now(),
            description: this.taskDescription,
            time: this.time,
            icon,
            completed: true,
          };

          if (this.currentUser) {
            this.currentUser.tasks.unshift(newTask);

            this.taskDescription = '';
            this.time = '';
            this.saveTasks();
          }
        },
      });
    }
  }

  editTasks(task: Tasks) {
    this.taskDescription = task.description;
    this.time = task.time;
    this.editingTaskId = task.id;

    console.log(task);

    this.saveTasks();
  }

  deleteTasks(taskId: number) {
    if (this.currentUser) {
      this.currentUser.tasks = this.currentUser?.tasks.filter(
        (task) => task.id !== taskId
      );
    }

    this.saveTasks();
  }

  completedTasks(task: Tasks) {
    task.completed = !task.completed;

    this.saveTasks();
  }
}

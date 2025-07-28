import { Component } from '@angular/core';
import { WeatherService } from '../service/weather.service';

interface Task {
  id: number;
  description: string;
  icon: string;
  time: string;
  completed: boolean;
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
  taskDescription = '';
  time = '';
  icon = '';
  tasks: Task[] = [];
  editingTaskId: number | null = null;

  currentWeather = '';
  currentWeatherCity = '';
  currentWeatherIcon = '';
  currentWeatherByHour: any = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadTasks();

    this.weatherService.getWeatherByCity('medan').subscribe({
      next: (data: any) => {
        const weatherData = data as WeatherData;

        console.log(data);

        this.currentWeather = weatherData.current.condition.text;
        this.currentWeatherCity = weatherData.location.name;
        this.currentWeatherIcon = weatherData.current.condition.icon;
      },
      error: (err) => {
        console.log('gagal mendapatkan data cuaca');
      },
    });
  }

  loadTasks() {
    const saved = localStorage.getItem('tasks');

    this.tasks = saved ? JSON.parse(saved) : [];
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTasks() {
    if (!this.taskDescription.trim()) return;

    if (this.editingTaskId !== null) {
      const task = this.tasks.find((t) => t.id === this.editingTaskId);

      if (task) task.description == this.taskDescription;

      this.editingTaskId == null;
    } else {
      this.weatherService.getWeatherForecast('medan').subscribe({
        next: (data: any) => {
          const hourIndex = Number(this.time.split(':')[0]);
          const icon =
            data.forecast.forecastday[0].hour[hourIndex].condition.icon;

          const newTask: Task = {
            id: Date.now(),
            description: this.taskDescription,
            time: this.time,
            icon,
            completed: true,
          };

          this.tasks.unshift(newTask);
          this.taskDescription = '';
          this.saveTasks();
        },
      });
    }
  }

  editTasks(task: Task) {
    this.taskDescription = task.description;
    this.time = task.time;
    this.editingTaskId = task.id;

    this.saveTasks();
  }

  deleteTasks(taskId: number) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);

    this.saveTasks();
  }

  completedTasks(task: Task) {
    task.completed = !task.completed;

    this.saveTasks();
  }
}

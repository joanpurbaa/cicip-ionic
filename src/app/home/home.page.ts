import { Component } from '@angular/core';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  taskDescription = '';
  tasks: Task[] = [];
  editingTaskId: number | null = null;

  ngOnInit() {
    this.loadTasks();
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
      const newTask: Task = {
        id: Date.now(),
        description: this.taskDescription,
        completed: true,
      };

      this.tasks.unshift(newTask);
    }

    this.taskDescription = '';
    this.saveTasks();
  }

  editTasks(task: Task) {
    this.taskDescription = task.description;
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

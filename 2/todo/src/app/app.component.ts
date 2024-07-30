import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Todo{
  title: string,
  descrition: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  title = 'todo';
  todos: Todo[] = [];


}



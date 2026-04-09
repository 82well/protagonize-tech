import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaTarefasComponent } from './components/lista-tarefas/lista-tarefas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaTarefasComponent],
  template: `
    <div class="container">
      <h1>Gerenciador de Tarefas</h1>
      <app-lista-tarefas></app-lista-tarefas>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
  `]
})
export class AppComponent {
  title = 'tarefas-app';
}
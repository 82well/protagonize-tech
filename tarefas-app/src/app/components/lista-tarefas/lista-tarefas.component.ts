import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/tarefa.model';
import { FormularioTarefaComponent } from '../formulario-tarefa/formulario-tarefa.component';

@Component({
  selector: 'app-lista-tarefas',
  standalone: true,
  imports: [CommonModule, FormularioTarefaComponent],
  template: `
    <div class="tarefas-container">
      <h2>Lista de Tarefas</h2>
      <button class="btn-add" (click)="showForm = !showForm">
        {{ showForm ? 'Cancelar' : 'Adicionar Tarefa' }}
      </button>

      <app-formulario-tarefa
        *ngIf="showForm"
        [tarefa]="selectedTarefa"
        (save)="onSave($event)"
        (cancel)="onCancel()">
      </app-formulario-tarefa>

      <table class="tarefas-table" *ngIf="tarefas.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Data Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let tarefa of tarefas">
            <td>{{ tarefa.id }}</td>
            <td>{{ tarefa.titulo }}</td>
            <td>{{ tarefa.descricao }}</td>
            <td>{{ tarefa.status }}</td>
            <td>{{ tarefa.dataCriacao | date:'short' }}</td>
            <td>
              <button class="btn-edit" (click)="editTarefa(tarefa)">Editar</button>
              <button class="btn-delete" (click)="deleteTarefa(tarefa.id!)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="tarefas.length === 0">Nenhuma tarefa encontrada.</p>
    </div>
  `,
  styles: [`
    .tarefas-container {
      margin-top: 20px;
    }
    .btn-add {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .btn-add:hover {
      background-color: #45a049;
    }
    .tarefas-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .tarefas-table th, .tarefas-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .tarefas-table th {
      background-color: #f2f2f2;
    }
    .btn-edit {
      background-color: #2196F3;
      color: white;
      border: none;
      padding: 5px 10px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 3px;
    }
    .btn-delete {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 3px;
    }
    .btn-edit:hover {
      background-color: #0b7dda;
    }
    .btn-delete:hover {
      background-color: #da190b;
    }
  `]
})
export class ListaTarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  showForm = false;
  selectedTarefa: Tarefa | null = null;

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.loadTarefas();
  }

  loadTarefas(): void {
    this.tarefaService.getAll().subscribe({
      next: (data) => this.tarefas = data,
      error: (error) => console.error('Erro ao carregar tarefas:', error)
    });
  }

  editTarefa(tarefa: Tarefa): void {
    this.selectedTarefa = { ...tarefa };
    this.showForm = true;
  }

  deleteTarefa(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.tarefaService.delete(id).subscribe({
        next: () => this.loadTarefas(),
        error: (error) => console.error('Erro ao excluir tarefa:', error)
      });
    }
  }

  onSave(tarefa: Tarefa): void {
    if (tarefa.id) {
      this.tarefaService.update(tarefa.id, tarefa).subscribe({
        next: () => {
          this.loadTarefas();
          this.onCancel();
        },
        error: (error) => console.error('Erro ao atualizar tarefa:', error)
      });
    } else {
      this.tarefaService.create(tarefa).subscribe({
        next: () => {
          this.loadTarefas();
          this.onCancel();
        },
        error: (error) => console.error('Erro ao criar tarefa:', error)
      });
    }
  }

  onCancel(): void {
    this.showForm = false;
    this.selectedTarefa = null;
  }
}
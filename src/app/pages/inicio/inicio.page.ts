import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { GastosService } from '../../services/gasto.service';
import { CATEGORY_CONFIG } from '../../category-config';
import { Subscription } from 'rxjs';

interface CategorySpending {
    key: string;
    value: number;
    color?: string; // Color como propiedad opcional
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, OnDestroy {
  private gastosSubscription: Subscription | undefined;
  gastos: any[] = [];
  myPieChart: any;
  categorySpendingArray: CategorySpending[] = []; // Usar el tipo definido
  totalSpending: number = 0;
  gastoForm: FormGroup;

  constructor(
    private gastosService: GastosService,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.gastoForm = this.fb.group({
      categoria: [''],
      cantidad: [''],
    });
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadExpenses();
    this.calculateTotalSpending();
    this.createChart();

    this.gastosSubscription = this.gastosService.getGastosUpdateListener().subscribe(() => {
      this.loadExpenses();
      this.calculateTotalSpending();
      this.updateChartData();
    });

    this.loadTheme();
  }

  ionViewWillEnter() {
    this.loadExpenses();
    this.updateChartData();
    this.calculateTotalSpending();
  }

  ngOnDestroy() {
    if (this.gastosSubscription) {
      this.gastosSubscription.unsubscribe();
    }
    this.destroyChart();
  }

  loadExpenses() {
    const allExpenses = JSON.parse(localStorage.getItem('expenses') || '{}');
    this.categorySpendingArray = Object.entries(allExpenses).map(([key, value]) => ({
      key,
      value: value as number,
      color: CATEGORY_CONFIG.find(cat => cat.name === key)?.color || '#ccc' // Asigna el color aquí
    }));
  }

  calculateTotalSpending() {
    this.totalSpending = this.categorySpendingArray.reduce((total, category) => total + category.value, 0);
  }

  toggleTheme(event: any) {
    const theme = event.detail.checked ? 'dark' : 'light';
    this.renderer.setAttribute(document.body, 'color-theme', theme);
    localStorage.setItem('theme', theme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.renderer.setAttribute(document.body, 'color-theme', savedTheme);
  }

  goToAddCategory() {
    this.router.navigate(['/add-category']);
  }

  destroyChart() {
    if (this.myPieChart) {
      this.myPieChart.destroy();
      this.myPieChart = null;
    }
  }

  createChart() {
    this.destroyChart(); 
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;

    if (this.categorySpendingArray.length === 0) return; 

    const chartData = {
      labels: this.categorySpendingArray.map(category => category.key),
      datasets: [{
        data: this.categorySpendingArray.map(category => category.value),
        backgroundColor: this.categorySpendingArray.map(category => category.color), // Usa el color asignado
      }],
    };

    this.myPieChart = new Chart(ctx, {
      type: 'pie',
      data: chartData,
    });
  }

  updateChartData() {
    if (!this.myPieChart) {
      this.createChart();
    } else {
      this.myPieChart.data.datasets[0].data = this.categorySpendingArray.map(category => category.value);
      this.myPieChart.data.labels = this.categorySpendingArray.map(category => category.key);
      this.myPieChart.data.datasets[0].backgroundColor = this.categorySpendingArray.map(category => category.color); // Actualiza los colores
      this.myPieChart.update();
    }
  }

  deleteCategory(index: number) {
    const categoryKey = this.categorySpendingArray[index].key;

    this.categorySpendingArray.splice(index, 1);

    const allExpenses = JSON.parse(localStorage.getItem('expenses') || '{}');
    delete allExpenses[categoryKey];
    localStorage.setItem('expenses', JSON.stringify(allExpenses));

    this.calculateTotalSpending();
    this.updateChartData();
  }

  editCategory(index: number) {
    const category = this.categorySpendingArray[index];
    const newAmount = prompt(`Editar gasto para ${category.key}:`, category.value.toString());

    if (newAmount !== null && !isNaN(Number(newAmount))) {
      this.categorySpendingArray[index].value = Number(newAmount);

      // Actualizar el almacenamiento y el gráfico
      const allExpenses = JSON.parse(localStorage.getItem('expenses') || '{}');
      allExpenses[category.key] = Number(newAmount);
      localStorage.setItem('expenses', JSON.stringify(allExpenses));

      this.updateChartData();
      this.calculateTotalSpending();
    }
  }
}

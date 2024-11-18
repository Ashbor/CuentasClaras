import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CATEGORY_CONFIG } from '../category-config';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  private gastos: any[] = [];
  private gastosUpdated = new Subject<void>();

  constructor() {
    this.loadGastos(); // Cargar los gastos al iniciar el servicio
  }

  loadGastos() {
    const storedGastos = JSON.parse(localStorage.getItem('gastos') || '[]');
    this.gastos = storedGastos;
  }
  getGastos() {
    return this.gastos;
  }

  getGastosUpdateListener() {
    return this.gastosUpdated.asObservable(); // Retorna el observable para las suscripciones
  }

  // Método para agregar gasto
  addGasto(gasto: { categoria: string; cantidad: number }) {
    const color = CATEGORY_CONFIG.find(category => category.name === gasto.categoria)?.color; // Obtén el color
    const gastoConColor = { ...gasto, color }; // Agrega el color al gasto
    this.gastos.push(gastoConColor);
    localStorage.setItem('gastos', JSON.stringify(this.gastos)); // Guarda los gastos en localStorage
    this.gastosUpdated.next(); // Notificar a los suscriptores
  }

  // Método para modificar gasto (actualiza la lista de gastos en localStorage)
  setGastos(gastos: any[]) {
    this.gastos = gastos;
    localStorage.setItem('gastos', JSON.stringify(this.gastos));
    this.gastosUpdated.next(); // Notificar a los suscriptores
  }

  // Método para eliminar gasto
  deleteGasto(index: number) {
    this.gastos.splice(index, 1); // Elimina el gasto en el índice dado
    localStorage.setItem('gastos', JSON.stringify(this.gastos));
    this.gastosUpdated.next(); // Notificar a los suscriptores
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GastosService } from '../../services/gasto.service';
import { CATEGORY_CONFIG } from '../../category-config';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  categories = CATEGORY_CONFIG;
  selectedCategory: string | null = null; // Correctamente definido
  cantidad: number = 0;

  constructor(private router: Router, private gastosService: GastosService) {}

  ngOnInit() {}

  selectCategory(category: { name: string; icon: string; color: string }) {
    this.selectedCategory = category.name; // Almacena solo el nombre de la categoría
  }

  addGasto() {
    if (this.selectedCategory && this.cantidad > 0) {
      // Obtener los gastos existentes
      const allExpenses = JSON.parse(localStorage.getItem('expenses') || '{}');

      // Si la categoría ya existe, actualizar la cantidad
      if (allExpenses[this.selectedCategory]) {
        allExpenses[this.selectedCategory] += this.cantidad;
      } else {
        // Si no existe, crear la nueva categoría
        allExpenses[this.selectedCategory] = this.cantidad;
      }

      // Guardar los gastos actualizados en localStorage
      localStorage.setItem('expenses', JSON.stringify(allExpenses));

      // Reinicia los valores después de agregar el gasto
      this.selectedCategory = null; // Cambiado a null para mantener el tipo
      this.cantidad = 0;

      // Redirigir a la página de inicio
      this.router.navigate(['/inicio']);
    }
  }
}

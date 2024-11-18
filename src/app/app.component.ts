import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.verificarConsentimiento();
  }

  verificarConsentimiento() {
    const consentimiento = localStorage.getItem('consentimiento');
    if (!consentimiento) {
      // Si no se ha aceptado, redirigir a la página de aviso de privacidad
      this.router.navigateByUrl('/aviso-privacidad');
    } else {
      // Si ya se ha aceptado, redirigir a la página principal
      this.router.navigateByUrl('/inicio');
    }
  }
}
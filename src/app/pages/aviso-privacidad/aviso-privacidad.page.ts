import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aviso-privacidad',
  templateUrl: './aviso-privacidad.page.html',
  styleUrls: ['./aviso-privacidad.page.scss'],
})
export class AvisoPrivacidadPage implements OnInit {

  constructor(private router: Router) { }
  aceptar() {
    
      localStorage.setItem('consentimiento', 'aceptado');
      this.router.navigateByUrl('/login');  // Redirigir al login tras aceptar
  }

  ngOnInit() {
  }

}

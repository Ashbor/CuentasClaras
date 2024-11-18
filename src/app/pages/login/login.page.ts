import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, 
    public alertController:AlertController, 
    private router: Router ) { 

    this.formularioLogin = this.fb.group({
      'nombre' : new FormControl("", Validators.required),
      'password' : new FormControl("",Validators.required) 
    })

  }

  ngOnInit() {
    const consentimiento = localStorage.getItem('consentimiento');
  if (!consentimiento) {
    // Si no ha aceptado el consentimiento, redirige al aviso de privacidad
    this.router.navigateByUrl('/aviso-privacidad');
  }
  }
  
  async ingresar() {
    var f = this.formularioLogin.value;
  
    var usuario = localStorage.getItem('usuario');
  
    if (usuario) {
      var usuarioObj = JSON.parse(usuario);
  
      if (usuarioObj.nombre === f.nombre && usuarioObj.password === f.password) {
        // Login exitoso
        console.log("Login correcto");
        this.router.navigateByUrl('/inicio');  // Redirigir a la página de inicio
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos que ingresaste son incorrectos',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se encontraron datos del usuario registrado.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
  
  
}

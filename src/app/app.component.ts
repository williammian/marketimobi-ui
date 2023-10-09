import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router) { }

  exibindoNavbar() {
    return this.router.url !== '/'
      && this.router.url !== '/login'
      && this.router.url !== '/inicio'
      && this.router.url !== '/novoContato'
      && this.router.url !== '/esqueceuSenha';
  }

}

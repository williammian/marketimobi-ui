import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title
    ) { }

  ngOnInit() {
    this.title.setTitle('Login');
  }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() => {
        if(this.auth.temPermissao('ROLE_PORTFOLIO') || this.auth.temPermissao('ROLE_ADMINISTRADOR')) {
          this.router.navigate(['/portfolio/principais']);
        } else {
          this.router.navigate(['/portfolio/portfolio-sem-acesso']);
        }
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

}

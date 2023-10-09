import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/seguranca/auth.service';
import { LogoutService } from './../../seguranca/logout.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categorias = [];

  exibindoMenu = false;

  configurouDropdown = false;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    if(!this.auth.isAccessTokenInvalido()) {
      this.categoriaService.listarComCategoriasPaiVazias()
        .then(categorias => {
          this.categorias = categorias;
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  }

  configuraDropDown() {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }

  openCloseNav() {
    if(!this.configurouDropdown) {
      this.configuraDropDown();
      this.configurouDropdown = true;
    }

    if(this.exibindoMenu) {
      document.getElementById("mySidenav").style.width = "0";
    }else{
      document.getElementById("mySidenav").style.width = "230px";
    }
    this.exibindoMenu = !this.exibindoMenu;
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "230px";
    this.exibindoMenu = true;
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    this.exibindoMenu = false;
  }

}

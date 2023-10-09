import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar-inicio',
  templateUrl: './navbar-inicio.component.html',
  styleUrls: ['./navbar-inicio.component.css']
})
export class NavbarInicioComponent implements OnInit {

  images: any[];

  constructor() { }

  ngOnInit() {
    this.images = [];
    this.images.push({source:'assets/imagens/1.jpg', title:'Imagem 1'});
    this.images.push({source:'assets/imagens/2.jpg', title:'Imagem 2'});
    this.images.push({source:'assets/imagens/3.jpg', title:'Imagem 3'});
    this.images.push({source:'assets/imagens/4.jpg', title:'Imagem 4'});
    this.images.push({source:'assets/imagens/5.jpg', title:'Imagem 5'});
    this.images.push({source:'assets/imagens/6.jpg', title:'Imagem 6'});
    this.images.push({source:'assets/imagens/7.jpg', title:'Imagem 7'});
    this.images.push({source:'assets/imagens/8.jpg', title:'Imagem 8'});
    this.images.push({source:'assets/imagens/9.jpg', title:'Imagem 9'});
    this.images.push({source:'assets/imagens/10.jpg', title:'Imagem 10'});
    this.images.push({source:'assets/imagens/11.jpg', title:'Imagem 11'});
    this.images.push({source:'assets/imagens/12.jpg', title:'Imagem 12'});
  }

}

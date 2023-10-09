import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { Produto, Categoria, ProdutoPortfolio } from './../../core/model';
import { PortfolioFiltro, ProdutoService } from './../../produtos/produto.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  carregou = false;

  produtos: Produto[];
  //produtoSelecionado: Produto;

  displayDialog: boolean;

  idCategoria: number;
  categoria: Categoria;

  totalRegistros = 0;
  filtro = new PortfolioFiltro();
  produtosPortfolio: ProdutoPortfolio[];
  produtoSelecionado: ProdutoPortfolio;

  @ViewChild('grid') grid;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    route.params.subscribe(val => {
      this.init();
    });
  }

  init() {
    this.idCategoria = this.route.snapshot.params['id'];

    let pag = this.route.snapshot.queryParams['pagina'];
    if(pag === undefined || pag === null) {
      pag = 0;
    }else {
      pag = pag-1;
    }

    this.router.navigate([], { 
      queryParams: {
        pagina: pag+1
      }
    });

    this.title.setTitle('Portfólio');

    //this.carregarProdutos();
    this.carregarProdutosPortfolio(pag);

    this.carregarCategoria();
  }

  ngOnInit() {
   
  }

  carregarProdutos() {
    if(this.idCategoria) {
      this.produtoService.listarPorCategoria(this.idCategoria)
        .then(produtos => {
          this.produtos = produtos;
        })
        .catch(erro => this.errorHandler.handle(erro));
    }else{
      this.produtoService.listarPrincipais()
        .then(produtos => {
          this.produtos = produtos;
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  }

  carregarProdutosPortfolio(pagina = 0) {
    this.filtro.pagina = pagina;

    if(this.idCategoria) {
      this.filtro.categoria = this.idCategoria;
      this.filtro.principal = null;
    }else {
      this.filtro.categoria = null;
      this.filtro.principal = 1;
    }

    this.produtoService.portfolio(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.produtosPortfolio = resultado.produtosPortfolio;

        this.grid.first = this.filtro.itensPorPagina * pagina;

        this.router.navigate([], { 
          queryParams: {
            pagina: pagina+1
          }
        });

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    if(this.carregou !== false) {
      const pagina = event.first / event.rows;
      this.carregarProdutosPortfolio(pagina);
    }
    this.carregou = true;
  }

  visualizarProduto(event: Event, produto: Produto) {
    this.produtoSelecionado = produto;
    this.displayDialog = true;
    event.preventDefault();
  }

  carregarCategoria() {
    if(this.idCategoria) {
      this.categoriaService.buscarPorId(this.idCategoria)
        .then(categoria => {
          this.categoria = categoria;
          this.title.setTitle(categoria.nome);
        })
        .catch(erro => this.errorHandler.handle(erro));
    }else{
      this.categoria = null;
    }
  }

}

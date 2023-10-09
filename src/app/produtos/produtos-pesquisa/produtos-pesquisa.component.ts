import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent, SelectItem } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ProdutoFiltro, ProdutoService } from '../produto.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ptBR } from 'app/core/model';

@Component({
  selector: 'app-produtos-pesquisa',
  templateUrl: './produtos-pesquisa.component.html',
  styleUrls: ['./produtos-pesquisa.component.css']
})
export class ProdutosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ProdutoFiltro();
  produtos = [];
  @ViewChild('tabela') grid;

  categorias = [];

  principais: SelectItem[];

  ptBR = new ptBR();

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title
  ) {

    this.principais = [
      {label:'Não informado', value:null},
      {label:'Sim', value:1},
      {label:'Não', value:2}
    ];

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Produtos');

    this.carregarCategorias();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.produtoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.produtos = resultado.produtos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(produto: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(produto);
      }
    });
  }

  excluir(produto: any) {
    this.produtoService.excluir(produto.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Produto excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    this.categoriaService.listarTodas(1)
      .then(categorias => {
        this.categorias = categorias
          .map(c => ({ label: c === null ? 'Não informado' : c.nome, value: c === null ? null : c.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

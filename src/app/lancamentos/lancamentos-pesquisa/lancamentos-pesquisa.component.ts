import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ptBR } from 'app/core/model';
import { ImobiliariaService } from 'app/imobiliarias/imobiliaria.service';
import { ProdutoService } from 'app/produtos/produto.service';
import { UsuarioService } from 'app/usuarios/usuario.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  imobiliarias = [];
  usuarios = [];
  produtos = [];

  ptBR = new ptBR();

  constructor(
    private lancamentoService: LancamentoService,
    private imobiliariaService: ImobiliariaService,
    private usuarioService: UsuarioService,
    private produtoService: ProdutoService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title
  ) {
    this.filtro.dataInicial = new Date();
    this.filtro.dataFinal = new Date();
  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Downloads Efetuados');

    this.carregarImobiliarias();
    this.carregarUsuarios();
    this.carregarProdutos();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Lançamento de download excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarImobiliarias() {
    this.imobiliariaService.listarTodasImobiliariaDto(1)
      .then(imobiliarias => {
        this.imobiliarias = imobiliarias
          .map(i => ({ label: i === null ? 'Não informada' : i.nome, value: i === null ? null : i.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarUsuarios() {
    this.usuarioService.listarTodosUsuarioDto(1)
      .then(usuarios => {
        this.usuarios = usuarios
          .map(u => ({ label: u === null ? 'Não informado' : u.nome, value: u === null ? null : u.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarProdutos() {
    this.produtoService.listarTodosProdutoDto(1)
      .then(produtos => {
        this.produtos = produtos
          .map(p => ({ label: p === null ? 'Não informado' : p.codigo + '-' + p.nome, value: p === null ? null : p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

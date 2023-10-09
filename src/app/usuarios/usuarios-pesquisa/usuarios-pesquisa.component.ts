import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent, SelectItem } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ptBR } from './../../core/model';
import { UsuarioFiltro, UsuarioService } from '../usuario.service';
import { ImobiliariaService } from './../../imobiliarias/imobiliaria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new UsuarioFiltro();
  usuarios = [];
  @ViewChild('tabela') grid;

  imobiliarias = [];

  status: SelectItem[];

  ptBR = new ptBR;

  constructor(
    private usuarioService: UsuarioService,
    private imobiliariaService: ImobiliariaService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title
  ) {

    this.status = [
      {label:'Não informado', value:null},
      {label:'Indefinido', value:'INDEFINIDO'},
      {label:'Ativo', value:'ATIVO'},
      {label:'Inativo', value:'INATIVO'}
    ];

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Usuários / Corretores');

    this.carregarImobiliarias();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.usuarioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.usuarios = resultado.usuarios;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(usuario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any) {
    this.usuarioService.excluir(usuario.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Usuário excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  mudarStatus(usuario: any): void {
    const novoStatus = usuario.status === 'INDEFINIDO' || usuario.status === 'INATIVO' ? 'ATIVO' : 'INATIVO';

    this.usuarioService.mudarStatus(usuario.id, novoStatus)
      .then(() => {
        const acao = novoStatus === 'ATIVO' ? 'ativado' : 'desativado';

        usuario.status = novoStatus;
        this.messageService.add({ severity: 'success', detail: `Usuário ${acao} com sucesso!` });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarImobiliarias() {
    this.imobiliariaService.listarTodasImobiliariaDto(1)
      .then(imobiliarias => {
        this.imobiliarias = imobiliarias
          .map(i => ({ label: i === null ? 'Não informado' : i.nome, value: i === null ? null : i.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

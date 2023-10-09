import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ContatoFiltro, ContatoService } from '../contato.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ptBR } from './../../core/model';

@Component({
  selector: 'app-contatos-pesquisa',
  templateUrl: './contatos-pesquisa.component.html',
  styleUrls: ['./contatos-pesquisa.component.css']
})
export class ContatosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ContatoFiltro();
  contatos = [];
  @ViewChild('tabela') grid;

  conferidos: SelectItem[];

  ptBR = new ptBR();

  constructor(
    private contatoService: ContatoService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private title: Title
  ) {

    this.conferidos = [
      {label:'Ambos', value:null},
      {label:'Conferidos', value:1},
      {label:'Não Conferidos', value:2}
    ];

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de contatos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.contatoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.contatos = resultado.contatos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(contato: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(contato);
      }
    });
  }

  excluir(contato: any) {
    this.contatoService.excluir(contato.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Contato excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  mudarConferido(contato: any): void {
    const novoConferido = !contato.conferido;

    this.contatoService.mudarConferido(contato.id, novoConferido)
      .then(() => {
        const acao = novoConferido ? 'conferido' : 'desconferido';

        contato.conferido = novoConferido;
        this.messageService.add({ severity: 'success', detail: `Contato ${acao} com sucesso!` });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

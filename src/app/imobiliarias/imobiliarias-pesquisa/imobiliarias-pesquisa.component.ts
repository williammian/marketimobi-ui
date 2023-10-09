import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ImobiliariaFiltro, ImobiliariaService } from '../imobiliaria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ptBR } from 'app/core/model';

@Component({
  selector: 'app-imobiliarias-pesquisa',
  templateUrl: './imobiliarias-pesquisa.component.html',
  styleUrls: ['./imobiliarias-pesquisa.component.css']
})
export class ImobiliariasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ImobiliariaFiltro();
  imobiliarias = [];
  @ViewChild('tabela') grid;

  status: SelectItem[];

  ptBR = new ptBR;

  constructor(
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
    this.title.setTitle('Pesquisa de Imobiliárias');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.imobiliariaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.imobiliarias = resultado.imobiliarias;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(imobiliaria: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(imobiliaria);
      }
    });
  }

  excluir(imobiliaria: any) {
    this.imobiliariaService.excluir(imobiliaria.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Imobiliária excluída com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  mudarStatus(imobiliaria: any): void {
    const novoStatus = imobiliaria.status === 'INDEFINIDO' || imobiliaria.status === 'INATIVO' ? 'ATIVO' : 'INATIVO';

    this.imobiliariaService.mudarStatus(imobiliaria.id, novoStatus)
      .then(() => {
        const acao = novoStatus === 'ATIVO' ? 'ativada' : 'desativada';

        imobiliaria.status = novoStatus;
        this.messageService.add({ severity: 'success', detail: `Imobiliária ${acao} com sucesso!` });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

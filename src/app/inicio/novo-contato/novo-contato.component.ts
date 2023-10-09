import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { ContatoService } from '../../contatos/contato.service';
import { Contato} from '../../core/model';

@Component({
  selector: 'app-novo-contato',
  templateUrl: './novo-contato.component.html',
  styleUrls: ['./novo-contato.component.css']
})
export class NovoContatoComponent implements OnInit {

  contato = new Contato();

  constructor(
    private contatoService: ContatoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo Contato');
  }

  salvar(form: FormControl) {
    this.adicionarContato(form);
  }

  adicionarContato(form: FormControl) {
    this.contatoService.adicionarNovo(this.contato)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Contato adicionado com sucesso!' });
        this.router.navigate(['/inicio']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

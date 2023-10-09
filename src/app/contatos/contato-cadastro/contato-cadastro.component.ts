import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { ContatoService } from './../contato.service';
import { Contato } from './../../core/model';

@Component({
  selector: 'app-contato-cadastro',
  templateUrl: './contato-cadastro.component.html',
  styleUrls: ['./contato-cadastro.component.css']
})
export class ContatoCadastroComponent implements OnInit {

  contato = new Contato();

  conferido = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ];

  constructor(
    private contatoService: ContatoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const idContato = this.route.snapshot.params['id'];

    this.title.setTitle('Novo Contato');

    if (idContato) {
      this.carregarContato(idContato);
    }
  }

  get editando() {
    return Boolean(this.contato.id)
  }

  carregarContato(id: number) {
    this.contatoService.buscarPorId(id)
      .then(contato => {
        this.contato = contato;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarContato(form);
    } else {
      this.adicionarContato(form);
    }
  }

  adicionarContato(form: FormControl) {
    this.contatoService.adicionar(this.contato)
      .then(contatoAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Contato adicionado com sucesso!' });
        this.router.navigate(['/contatos', contatoAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarContato(form: FormControl) {
    this.contatoService.atualizar(this.contato)
      .then(contato => {
        this.contato = contato;

        this.messageService.add({ severity: 'success', detail: 'Contato alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.contato = new Contato();
    }.bind(this), 1);

    this.router.navigate(['/contatos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Contato: ${this.contato.nome}`);
  }

}

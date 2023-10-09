import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';

import { UsuarioService, EsqueceuSenhaDto } from './../../usuarios/usuario.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ptBR } from 'app/core/model';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.css']
})
export class EsqueceuSenhaComponent implements OnInit {

  dto = new EsqueceuSenhaDto();

  ptBR = new ptBR;

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Esqueceu a senha');
  }

  confirmarEsqueceuSenha(form: FormControl) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja enviar nova senha ao e-mail informado?',
      accept: () => {
        this.esqueceuSenha(form);
      }
    });
  }

  esqueceuSenha(form: FormControl) {
    this.usuarioService.esqueceuSenha(this.dto)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Nova senha enviada ao e-mail com sucesso!' });
        form.reset();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

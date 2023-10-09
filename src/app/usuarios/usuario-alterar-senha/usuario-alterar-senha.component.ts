import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { Usuario } from './../../core/model';
import { UsuarioService, AlterarSenhaDto } from './../usuario.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-usuario-alterar-senha',
  templateUrl: './usuario-alterar-senha.component.html',
  styleUrls: ['./usuario-alterar-senha.component.css']
})
export class UsuarioAlterarSenhaComponent implements OnInit {

  usuario = new Usuario();

  dto = new AlterarSenhaDto();

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const idUsuario = this.route.snapshot.params['id'];

    this.carregarUsuario(idUsuario);
  }

  carregarUsuario(id: number) {
    this.usuarioService.buscarPorId(id)
      .then(usuario => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Alteração de senha do usuário: ${this.usuario.nome}`);
  }

  alterarSenha(form: FormControl) {
    this.usuarioService.alterarSenha(this.usuario.id, this.dto)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Senha alterada com sucesso!' });
        //this.router.navigate(['/usuarios']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

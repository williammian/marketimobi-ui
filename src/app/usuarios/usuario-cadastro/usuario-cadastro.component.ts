import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import { SelectItem } from 'primeng/api';

import { Usuario, ptBR} from './../../core/model';
import { UsuarioService } from './../usuario.service';
import { ImobiliariaService } from './../../imobiliarias/imobiliaria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  formulario: FormGroup;

  uploadEmAndamento1 = false;

  uploadEmAndamento2 = false;

  imobiliarias = [];

  permissoes: SelectItem[];

  status: SelectItem[];

  sexos: SelectItem[];

  ptBR = new ptBR;

  constructor(
    private usuarioService: UsuarioService,
    private imobiliariaService: ImobiliariaService,
    private auth: AuthService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) {

    this.permissoes = [
      { label: 'Administrador do Sistema', value: { id: 1, descricao : 'ROLE_ADMINISTRADOR'} },
      { label: 'Alterar Senha', value: { id: 2, descricao : 'ROLE_ALTERAR_SENHA' } },
      { label: 'Meus Dados', value: { id: 3, descricao : 'ROLE_MEUS_DADOS' } },
      { label: 'Minha Imobiliária', value: { id: 4, descricao : 'ROLE_MINHA_IMOBILIARIA' } },
      { label: 'Portfólio', value: { id: 5, descricao : 'ROLE_PORTFOLIO' } }
    ];

    this.status = [
      { label: 'Indefinido', value: 'INDEFINIDO' },
      { label: 'Ativo', value: 'ATIVO' },
      { label: 'Inativo', value: 'INATIVO' }
    ];

    this.sexos = [
      { label: 'Indefinido', value: 'INDEFINIDO' },
      { label: 'Masculino', value: 'MASCULINO' },
      { label: 'Feminino', value: 'FEMININO' }
    ];
  }

  ngOnInit() {
    this.configurarFormulario();

    const idUsuario = this.route.snapshot.params['id'];

    this.title.setTitle('Novo usuário / Corretor');

    if (idUsuario) {
      this.carregarUsuario(idUsuario);
    }

    this.carregarImobiliarias();
  }

  antesUploadImagem(event, qualImagem: number) {
    if(qualImagem === 1) {
      event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
      this.uploadEmAndamento1 = true;
    }else if(qualImagem === 2) {
      event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
      this.uploadEmAndamento2 = true;
    }
  }

  aoTerminarUploadImagem(event, qualImagem: number) {
    if(qualImagem === 1) {
      const imagem1 = JSON.parse(event.xhr.response);
      this.formulario.patchValue({
        imagem1: imagem1.nome,
        urlImagem1: imagem1.url
      });
      this.uploadEmAndamento1 = false;
    }else if(qualImagem === 2) {
      const imagem2 = JSON.parse(event.xhr.response);
      this.formulario.patchValue({
        imagem2: imagem2.nome,
        urlImagem2: imagem2.url
      });
      this.uploadEmAndamento2 = false;
    }
  }

  erroUpload(event, qualImagem: number) {
    if(qualImagem === 1) {
      this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar arquivo!' });
      this.uploadEmAndamento1 = false;
    }else if(qualImagem === 2) {
      this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar arquivo!' });
      this.uploadEmAndamento2 = false;
    }
  }

  removerImagem(qualImagem: number) {
    if(qualImagem === 1) {
      this.formulario.patchValue({
        imagem1: null,
        urlImagem1: null
      });
    }else if(qualImagem === 2) {
      this.formulario.patchValue({
        imagem2: null,
        urlImagem2: null
      });
    }
  }

  nomeImagem(qualImagem: number) {
    if(qualImagem === 1) {
      const nome = this.formulario.get('imagem1').value;
      if (nome) {
        return nome.substring(nome.indexOf('_') + 1, nome.length);
      }
      return '';
    }else if(qualImagem === 2) {
      const nome = this.formulario.get('imagem2').value;
      if (nome) {
        return nome.substring(nome.indexOf('_') + 1, nome.length);
      }
      return '';
    }
  }

  get urlUploadImagem() {
    return this.usuarioService.urlUploadImagem();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [ null, Validators.required ],
      sobrenome: [ null, Validators.required ],
      nomeProfissional: [ ],
      sexo: [ 'INDEFINIDO', Validators.required ],
      status: [ 'INDEFINIDO', Validators.required ],
      dataNascimento: [ new Date(), Validators.required ],
      dataCadastro: [ new Date() ],
      telefoneFixo: [],
      telefoneCelular: [],
      cargo: [],
      creci: [],
      site: [],
      email: [ null, Validators.required ],
      senha: [],
      senhaInformada: [],
      imagem1: [],
      urlImagem1: [],
      imagem2: [],
      urlImagem2: [],
      imobiliaria: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      permissoes: []
    });
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  carregarUsuario(id: number) {
    this.usuarioService.buscarPorId(id)
      .then(usuario => {
        this.formulario.patchValue(usuario);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarUsuario();
    } else {
      this.adicionarUsuario();
    }
  }

  adicionarUsuario() {
    this.usuarioService.adicionar(this.formulario.value)
      .then(usuarioAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });
        this.router.navigate(['/usuarios', usuarioAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarUsuario() {
    this.usuarioService.atualizar(this.formulario.value)
      .then(usuario => {
        this.formulario.patchValue(usuario);

        this.messageService.add({ severity: 'success', detail: 'Usuário alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.usuario = new Usuario();
    }.bind(this), 1);

    this.router.navigate(['/usuarios/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Usuário / Corretor: ${this.formulario.get('nome').value}`);
  }

  carregarImobiliarias() {
    this.imobiliariaService.listarTodasImobiliariaDto(0)
      .then(imobiliarias => {
        this.imobiliarias = imobiliarias
          .map(i => ({ label: i.nome, value: i.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

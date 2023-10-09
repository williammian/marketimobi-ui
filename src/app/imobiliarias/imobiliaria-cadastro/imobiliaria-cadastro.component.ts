import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';
import { SelectItem } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Imobiliaria } from './../../core/model';
import { ImobiliariaService } from './../imobiliaria.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-imobiliaria-cadastro',
  templateUrl: './imobiliaria-cadastro.component.html',
  styleUrls: ['./imobiliaria-cadastro.component.css']
})
export class ImobiliariaCadastroComponent implements OnInit {

  formulario: FormGroup;

  uploadEmAndamento1 = false;

  uploadEmAndamento2 = false;

  status: SelectItem[];

  estados: SelectItem[];

  constructor(
    private imobiliariaService: ImobiliariaService,
    private auth: AuthService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) {

    this.status = [
      {label:'Indefinido', value:'INDEFINIDO'},
      {label:'Ativo', value:'ATIVO'},
      {label:'Inativo', value:'INATIVO'}
    ];

    this.estados = [
      {label:'Não Informado', value:null},
      {label:'SP', value:'SP'},
      {label:'MG', value:'MG'},
      {label:'RJ', value:'RJ'},
      {label:'ES', value:'ES'},
      {label:'PR', value:'PR'},
      {label:'SC', value:'SC'},
      {label:'RS', value:'RS'},
      {label:'DF', value:'DF'},
      {label:'GO', value:'GO'},
      {label:'MS', value:'MS'},
      {label:'MT', value:'MT'},
      {label:'BA', value:'BA'},
      {label:'SE', value:'SE'},
      {label:'AL', value:'AL'},
      {label:'PE', value:'PE'},
      {label:'PB', value:'PB'},
      {label:'RN', value:'RN'},
      {label:'CE', value:'CE'},
      {label:'PI', value:'PI'},
      {label:'MA', value:'MA'},
      {label:'TO', value:'TO'},
      {label:'PA', value:'PA'},
      {label:'AP', value:'AP'},
      {label:'AM', value:'AM'},
      {label:'RR', value:'RR'},
      {label:'AC', value:'AC'},
      {label:'RO', value:'RO'}
    ];

  }

  ngOnInit() {
    this.configurarFormulario();

    const idImobiliaria = this.route.snapshot.params['id'];

    this.title.setTitle('Nova Imobiliária');

    if (idImobiliaria) {
      this.carregarImobiliaria(idImobiliaria);
    }
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
    return this.imobiliariaService.urlUploadImagem();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [ null, Validators.required ],
      razaoSocial: [],
      status: [ 'INDEFINIDO', Validators.required ],
      dataCadastro: [ new Date() ],
      telefoneFixo: [],
      telefoneCelular: [],
      logradouro: [],
      complemento: [],
      bairro: [],
      cep: [],
      cidade: [],
      estado: [],
      site: [],
      email: [],
      creci: [],
      cnpj: [],
      imagem1: [],
      urlImagem1: [],
      imagem2: [],
      urlImagem2: []
    });
  }

  carregarImobiliaria(id: number) {
    this.imobiliariaService.buscarPorId(id)
      .then(imobiliaria => {
        this.formulario.patchValue(imobiliaria);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  salvar() {
    if (this.editando) {
      this.atualizarImobiliaria();
    } else {
      this.adicionarImobiliaria();
    }
  }

  adicionarImobiliaria() {
    this.imobiliariaService.adicionar(this.formulario.value)
      .then(imobiliariaAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Imobiliária adicionada com sucesso!' });

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/imobiliarias', imobiliariaAdicionada.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarImobiliaria() {
    this.imobiliariaService.atualizar(this.formulario.value)
      .then(imobiliaria => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(imobiliaria);

        this.messageService.add({ severity: 'success', detail: 'Imobiliária alterada com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.imobiliaria = new Imobiliaria();
    }.bind(this), 1);

    this.router.navigate(['/imobiliarias/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Imobiliária: ${this.formulario.get('nome').value}`);
  }

}

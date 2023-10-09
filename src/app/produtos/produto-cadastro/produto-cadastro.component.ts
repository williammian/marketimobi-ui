import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { Produto } from './../../core/model';
import { ProdutoService } from '../produto.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { CategoriaService } from 'app/categorias/categoria.service';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  produto = new Produto();

  categorias = [];

  uploadEmAndamento1 = false;
  uploadEmAndamento2 = false;
  uploadEmAndamento3 = false;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const idProduto = this.route.snapshot.params['id'];

    this.title.setTitle('Novo Produto');

    this.carregarCategorias();

    if (idProduto) {
      this.carregarProduto(idProduto);
    }
  }

  antesUploadImagem(event, qualImagem: number) {
    if(qualImagem == 1) {
      event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
      this.uploadEmAndamento1 = true;
    }else if(qualImagem == 2) {
      event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
      this.uploadEmAndamento2 = true;
    }else if(qualImagem == 3) {
      event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
      this.uploadEmAndamento3 = true;
    }
  }

  aoTerminarUploadImagem(event, qualImagem: number) {
    if(qualImagem === 1) {
      const imagem = JSON.parse(event.xhr.response);
      this.produto.imagem = imagem.nome;
      this.produto.urlImagem = imagem.url;
      this.uploadEmAndamento1 = false;
    }else if(qualImagem === 2) {
      const imagem = JSON.parse(event.xhr.response);
      this.produto.imagemFundo = imagem.nome;
      this.produto.urlImagemFundo = imagem.url;
      this.uploadEmAndamento2 = false;
    }else if(qualImagem === 3) {
      const imagem = JSON.parse(event.xhr.response);
      this.produto.imagemCard = imagem.nome;
      this.produto.urlImagemCard = imagem.url;
      this.uploadEmAndamento3 = false;
    }
  }

  erroUpload(event, qualImagem: number) {
    if(qualImagem === 1) {
      this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar arquivo!' });
      this.uploadEmAndamento1 = false;
    }else if(qualImagem === 2) {
      this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar arquivo!' });
      this.uploadEmAndamento2 = false;
    }else if(qualImagem === 3) {
      this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar arquivo!' });
      this.uploadEmAndamento3 = false;
    }
  }

  removerImagem(qualImagem: number) {
    if(qualImagem === 1) {
      this.produto.imagem = null;
      this.produto.urlImagem = null;
    }else if(qualImagem === 2) {
      this.produto.imagemFundo = null;
      this.produto.urlImagemFundo = null;
    }else if(qualImagem === 3) {
      this.produto.imagemCard = null;
      this.produto.urlImagemCard = null;
    }
  }

  nomeImagem(qualImagem: number) {
    let nome = null;

    if(qualImagem === 1) {
      nome = this.produto.imagem;
    }else if(qualImagem === 2) {
      nome = this.produto.imagemFundo;
    }else if(qualImagem === 3) {
      nome = this.produto.imagemCard;
    }

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  get urlUploadImagem() {
    return this.produtoService.urlUploadImagem();
  }

  get editando() {
    return Boolean(this.produto.id)
  }

  carregarProduto(id: number) {
    this.produtoService.buscarPorId(id)
      .then(produto => {
        this.produto = produto;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarProduto(form);
    } else {
      this.adicionarProduto(form);
    }
  }

  adicionarProduto(form: FormControl) {
    this.produtoService.adicionar(this.produto)
      .then(produtoAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Produto adicionado com sucesso!' });
        this.router.navigate(['/produtos', produtoAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProduto(form: FormControl) {
    this.produtoService.atualizar(this.produto)
      .then(produto => {
        this.produto = produto;

        this.messageService.add({ severity: 'success', detail: 'Produto alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.produto = new Produto();
    }.bind(this), 1);

    this.router.navigate(['/produtos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de produto: ${this.produto.nome}`);
  }

  carregarCategorias() {
    this.categoriaService.listarTodas(1)
      .then(categorias => {
        this.categorias = categorias
          .map(c => ({ label: c === null ? 'Não informado' : c.nome,
           value: c === null ? null : {id: c.id, codigo: c.codigo, nome: c.nome} }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

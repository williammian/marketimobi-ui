import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ProdutoService } from './../../produtos/produto.service';
import { Produto, ItemProduto } from './../../core/model';

@Component({
  selector: 'app-design-place',
  templateUrl: './design-place.component.html',
  styleUrls: ['./design-place.component.css']
})
export class DesignPlaceComponent implements OnInit {

  produto = new Produto();

  displayDialogVisualizar: boolean;

  uploadEmAndamento = false;

  tiposArquivos: SelectItem[];

  tipoArquivo: string;

  constructor(
    public auth: AuthService,
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private title: Title
  ) {
  }

  ngOnInit() {
    const idProduto = this.route.snapshot.params['id'];

    this.title.setTitle('Design Place');

    this.carregarProduto(idProduto);
  }

  carregarComboTiposArquivos() {
    let tipos = [];

    if(this.produto.gerarPNG) tipos.push({label:'PNG', value:'PNG'});
    if(this.produto.gerarPDF) tipos.push({label:'PDF', value:'PDF'});

    this.tiposArquivos = tipos;

    if(tipos.length > 0) this.tipoArquivo = tipos[0].value;
  }

  carregarProduto(idProduto: number) {
    this.produtoService.buscarPorId(idProduto)
      .then(produto => {
        this.produto = produto;
        this.carregarComboTiposArquivos();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  visualizarProduto(event: Event) {
    this.displayDialogVisualizar = true;
    event.preventDefault();
  }

  antesUploadImagem(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    this.uploadEmAndamento = true;
  }

  aoTerminarUploadImagem(event, itemProduto: ItemProduto) {
    const imagem = JSON.parse(event.xhr.response);

    itemProduto.imagemUsuario = imagem.nome;
    itemProduto.urlImagemUsuario = imagem.url;

    this.uploadEmAndamento = false;
  }

  erroUpload(event) {
    this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar arquivo!' });

    this.uploadEmAndamento = false;
  }

  removerImagem(itemProduto: ItemProduto) {
    itemProduto.imagemUsuario = null;
    itemProduto.urlImagemUsuario = null;
  }

  nomeImagem(itemProduto: ItemProduto) {
    let nome = null;

    nome = itemProduto.imagemUsuario;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  get urlUploadImagem() {
    return this.produtoService.urlUploadImagem();
  }

  gerar(event: Event) {
    document.body.classList.add('busy-cursor');

    let tipoArquivoStr = this.tipoArquivo;

    this.produtoService.gerar(tipoArquivoStr, this.auth.jwtPayload.usuario_id, this.auth.jwtPayload.imobiliaria_id, this.produto)
    .then(data => {

      let nomeArquivo = this.obterNomeArquivo();

      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = tipoArquivoStr === "PNG" ? nomeArquivo + ".png" : nomeArquivo + ".pdf";
      link.click();

      document.body.classList.remove('busy-cursor');
    })
    .catch(erro => {
        this.errorHandler.handle(erro);

        document.body.classList.remove('busy-cursor');
      }
    );
  }

  obterNomeArquivo() {
    let now = new Date();
    let tempo = "" + now.getFullYear() + (now.getMonth()+1) + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds();
    let nomeArquivo = this.produto.codigo + "-" + this.produto.nome + "-" + tempo;
    return nomeArquivo;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ItemProduto } from './../../core/model';
import { ProdutoService } from './../produto.service';

@Component({
  selector: 'app-produto-cadastro-item',
  templateUrl: './produto-cadastro-item.component.html',
  styleUrls: ['./produto-cadastro-item.component.css']
})
export class ProdutoCadastroItemComponent implements OnInit {

  @Input() itensProduto: Array<ItemProduto>;
  itemProduto: ItemProduto;
  exbindoFormularioItemProduto = false;
  itemProdutoIndex: number;

  uploadEmAndamento = false;

  tipos: SelectItem[];
  origens: SelectItem[];
  tiposImagemSistema: SelectItem[];
  tiposTextoSistema: SelectItem[];
  fontes: SelectItem[];
  tiposFonte: SelectItem[];
  alinhamentosTexto: SelectItem[];

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService,
  ) {

    this.tipos = [
      {label:'Imagem', value:'IMAGEM'},
      {label:'Texto', value:'TEXTO'}
    ];

    this.origens = [
      {label:'Sistema', value:'SISTEMA'},
      {label:'Usuário', value:'USUARIO'}
    ];

    this.tiposImagemSistema = [
      {label:'Fixo Informado', value:'FIXO_INFORMADO'},

      {label:'Imobiliária Imagem 1', value:'IMOBILIARIA_IMAGEM1'},
      {label:'Imobiliária Imagem 2', value:'IMOBILIARIA_IMAGEM2'},

      {label:'Usuário Imagem 1', value:'USUARIO_IMAGEM1'},
      {label:'Usuário Imagem 2', value:'USUARIO_IMAGEM2'}
    ];

    this.tiposTextoSistema = [
      {label:'Fixo Informado', value:'FIXO_INFORMADO'},

      {label:'Imobiliária Nome', value:'IMOBILIARIA_NOME'},
      {label:'Imobiliária Razão Social', value:'IMOBILIARIA_RAZAO_SOCIAL'},
      {label:'Imobiliária Telefone Fixo', value:'IMOBILIARIA_TELEFONE_FIXO'},
      {label:'Imobiliária Telefone Celular', value:'IMOBILIARIA_TELEFONE_CELULAR'},
      {label:'Imobiliária Logradouro', value:'IMOBILIARIA_LOGRADOURO'},
      {label:'Imobiliária Complemento', value:'IMOBILIARIA_COMPLEMENTO'},
      {label:'Imobiliária Bairro', value:'IMOBILIARIA_BAIRRO'},
      {label:'Imobiliária CEP', value:'IMOBILIARIA_CEP'},
      {label:'Imobiliária Cidade', value:'IMOBILIARIA_CIDADE'},
      {label:'Imobiliária Estado', value:'IMOBILIARIA_ESTADO'},
      {label:'Imobiliária E-mail', value:'IMOBILIARIA_EMAIL'},
      {label:'Imobiliária Site', value:'IMOBILIARIA_SITE'},
      {label:'Imobiliária CRECI', value:'IMOBILIARIA_CRECI'},
      {label:'Imobiliária CNPJ', value:'IMOBILIARIA_CNPJ'},

      {label:'Usuário Nome', value:'USUARIO_NOME'},
      {label:'Usuário Sobrenome', value:'USUARIO_SOBRENOME'},
      {label:'Usuário Nome Profissional', value:'USUARIO_NOME_PROFISSIONAL'},
      {label:'Usuário Telefone Fixo', value:'USUARIO_TELEFONE_FIXO'},
      {label:'Usuário Telefone Celular', value:'USUARIO_TELEFONE_CELULAR'},
      {label:'Usuário Cargo', value:'USUARIO_CARGO'},
      {label:'Usuário CRECI', value:'USUARIO_CRECI'},
      {label:'Usuário E-mail', value:'USUARIO_EMAIL'},
      {label:'Usuário Site', value:'USUARIO_SITE'}
    ];

    this.fontes = [
      {label:'Arial', value:'ARIAL'},
      {label:'Calibri', value:'CALIBRI'},
      {label:'Brush Script', value:'BRUSH_SCRIPT'},
      {label:'Tahoma', value:'TAHOMA'},
      {label:'Times New Roman', value:'TIMES_NEW_ROMAN'},
    ];

    this.tiposFonte = [
      {label:'Normal', value:'NORMAL'},
      {label:'Negrito', value:'NEGRITO'},
      {label:'Itálico', value:'ITALICO'},
      {label:'Negrito e Itálico', value:'NEGRITO_ITALICO'},
    ];

    this.alinhamentosTexto = [
      {label:'Esquerda', value:'ESQUERDA'},
      {label:'Centro', value:'CENTRO'},
      {label:'Direita', value:'DIREITA'}
    ];

  }

  ngOnInit() {
  }

  prepararNovoItemProduto() {
    this.exbindoFormularioItemProduto = true;
    this.itemProduto = new ItemProduto();
    this.itemProdutoIndex = this.itensProduto.length;
  }

  prepararEdicaoItemProduto(itemProduto: ItemProduto, index: number) {
    this.itemProduto = this.clonarItemProduto(itemProduto);
    this.exbindoFormularioItemProduto = true;
    this.itemProdutoIndex = index;
  }

  confirmarItemProduto(frm: FormControl) {
    this.itensProduto[this.itemProdutoIndex] = this.clonarItemProduto(this.itemProduto);

    this.exbindoFormularioItemProduto = false;

    frm.reset();
  }

  removerItemProduto(index: number) {
    this.itensProduto.splice(index, 1);
  }

  clonarItemProduto(origem: ItemProduto) {
    let destino = new ItemProduto();
    this.clonar(destino, origem);
    return destino;
  }

  get editando() {
    return this.itemProduto && this.itemProduto.id;
  }

  clonar(destino: ItemProduto, origem: ItemProduto) {
    destino.id= origem.id,
    destino.sequencia= origem.sequencia,
    destino.descricao= origem.descricao,
    destino.etiqueta= origem.etiqueta,
    destino.orientacaoUsuario= origem.orientacaoUsuario,
    destino.tipo= origem.tipo,
    destino.origem= origem.origem,
    destino.largura= origem.largura,
    destino.altura= origem.altura,
    destino.posicaoX= origem.posicaoX,
    destino.posicaoY= origem.posicaoY,
    destino.tipoImagemSistema= origem.tipoImagemSistema,
    destino.imagemSistema= origem.imagemSistema,
    destino.urlImagemSistema= origem.urlImagemSistema,
    destino.imagemUsuario= origem.imagemUsuario,
    destino.urlImagemUsuario= origem.urlImagemUsuario,
    destino.tipoTextoSistema= origem.tipoTextoSistema,
    destino.textoSistema= origem.textoSistema,
    destino.textoUsuario= origem.textoUsuario,
    destino.qtdMaxCaracteres= origem.qtdMaxCaracteres,
    destino.fonte= origem.fonte,
    destino.tamanhoFonte= origem.tamanhoFonte,
    destino.corFonteR= origem.corFonteR,
    destino.corFonteG= origem.corFonteG,
    destino.corFonteB= origem.corFonteB,
    destino.tipoFonte= origem.tipoFonte,
    destino.alinhamentoTexto= origem.alinhamentoTexto
  }

  antesUploadImagem(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    this.uploadEmAndamento = true;
  }

  aoTerminarUploadImagem(event) {
    const imagem = JSON.parse(event.xhr.response);

    this.itemProduto.imagemSistema = imagem.nome;
    this.itemProduto.urlImagemSistema = imagem.url;

    this.uploadEmAndamento = false;
  }

  erroUpload(event) {
    this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar arquivo!' });

    this.uploadEmAndamento = false;
  }

  removerImagem() {
    this.itemProduto.imagemSistema = null;
    this.itemProduto.urlImagemSistema = null;
  }

  nomeImagem() {
    let nome = null;

    nome = this.itemProduto.imagemSistema;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  get urlUploadImagem() {
    return this.produtoService.urlUploadImagem();
  }

}

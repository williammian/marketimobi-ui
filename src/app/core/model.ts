export class Imobiliaria {
  id: number;
  nome: string;
  razaoSocial: string;
  status = 'INDEFINIDO';
  dataCadastro = new Date();
  telefoneFixo: string;
  telefoneCelular: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  site: string;
  email: string;
  creci: string;
  cnpj: string;
  imagem1: string;
  urlImagem1: string;
  imagem2: string;
  urlImagem2: string;
}

export class Contato {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
  conferido = false;
  dataCadastro = new Date();
}

export class Categoria {
  id: number;
  codigo: string;
  nome: string;
  categoriaPai: Categoria;
  subcategorias = new Array<Categoria>();
}

export class Permissao {
  id: number;
  descricao: string;
}

export class Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  nomeProfissional: string;
  sexo = 'INDEFINIDO';
  status = 'INDEFINIDO';
  dataNascimento = new Date();
  dataCadastro = new Date();
  telefoneFixo: string;
  telefoneCelular: string;
  cargo: string;
  creci: string;
  site: string;
  email: string;
  senha: string;
  senhaInformada: string;
  imagem1: string;
  urlImagem1: string;
  imagem2: string;
  urlImagem2: string;
  imobiliaria: Imobiliaria;
  permissoes = new Array<Permissao>();
}

export class ItemProduto {
  id: number;
  sequencia: number;
  descricao: string;
  etiqueta: string;
  orientacaoUsuario: string;
  tipo = 'IMAGEM';
  origem = 'SISTEMA';
  largura: number;
  altura: number;
  posicaoX: number;
  posicaoY: number;
  tipoImagemSistema = 'FIXO_INFORMADO';
  imagemSistema: string;
  urlImagemSistema: string;
  imagemUsuario: string;
  urlImagemUsuario: string;
  tipoTextoSistema = 'FIXO_INFORMADO';
  textoSistema: string;
  textoUsuario: string;
  qtdMaxCaracteres: number;
  fonte = 'ARIAL';
  tamanhoFonte: number;
  corFonteR: number;
  corFonteG: number;
  corFonteB: number;
  tipoFonte= 'NORMAL';
  alinhamentoTexto = 'ESQUERDA';
/*
  constructor(
    id?: number,
    sequencia?: number,
    descricao?: string,
    etiqueta?: string,
    orientacaoUsuario?: string,
    tipo?: string,
    origem?: string,
    largura?: number,
    altura?: number,
    posicaoX?: number,
    posicaoY?: number,
    tipoImagemSistema?: string,
    imagemSistema?: string,
    urlImagemSistema?: string,
    imagemUsuario?: string,
    urlImagemUsuario?: string,
    tipoTextoSistema?: string,
    textoSistema?: string,
    textoUsuario?: string,
    qtdMaxCaracteres?: number,
    fonte?: string,
    tamanhoFonte?: number,
    corFonteR?: number,
    corFonteG?: number,
    corFonteB?: number,
    tipoFonte?: string,
    alinhamentoTexto?: string
  ) {
    this.id= id,
    this.sequencia= sequencia,
    this.descricao=descricao,
    this.etiqueta= etiqueta,
    this.orientacaoUsuario= orientacaoUsuario,
    this.tipo= tipo,
    this.origem= origem,
    this.largura= largura,
    this.altura= altura,
    this.posicaoX= posicaoX,
    this.posicaoY= posicaoY,
    this.tipoImagemSistema= tipoImagemSistema,
    this.imagemSistema= imagemSistema,
    this.urlImagemSistema= urlImagemSistema,
    this.imagemUsuario= imagemUsuario,
    this.urlImagemUsuario= urlImagemUsuario,
    this.tipoTextoSistema= tipoTextoSistema,
    this.textoSistema= textoSistema,
    this.textoUsuario= textoUsuario,
    this.qtdMaxCaracteres= qtdMaxCaracteres,
    this.fonte= fonte,
    this.tamanhoFonte= tamanhoFonte,
    this.corFonteR= corFonteR,
    this.corFonteG= corFonteG,
    this.corFonteB= corFonteB,
    this.tipoFonte= tipoFonte,
    this.alinhamentoTexto= alinhamentoTexto
  }
*/
}

export class Produto {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  categoria: Categoria;
  gerarPNG= false;
  gerarPDF= false;
  imagem: string;
  urlImagem: string;
  larguraImagem: number;
  alturaImagem: number;
  imagemCard: string;
  urlImagemCard: string;
  larguraImagemCard: number;
  alturaImagemCard: number;
  larguraImagemAmostra: number;
  alturaImagemAmostra: number;
  imagemFundo: string;
  urlImagemFundo: string;
  dataCadastro = new Date();
  principal= false;
  itensProduto = new Array<ItemProduto>();
}

export class ProdutoPortfolio {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  imagemCard: string;
  larguraImagemCard: number;
  alturaImagemCard: number;
  imagem: string;
  larguraImagemAmostra: number;
  alturaImagemAmostra: number;
}

export class ptBR {
  firstDayOfWeek= 0;
  dayNames= ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  dayNamesShort= ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  dayNamesMin= ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'];
  monthNames= ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
     'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  monthNamesShort= ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  today= 'Hoje';
  clear= 'Limpar'
}

import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

import { Produto, ItemProduto } from './../core/model';

import { MoneyHttp } from './../seguranca/money-http';

export class PortfolioFiltro {
  principal: number;
  categoria: number;
  pagina = 0;
  itensPorPagina = 12;
}

export class ProdutoFiltro {
  codigo: string;
  nome: string;
  dataCadastro: Date;
  principal: boolean;
  categoria: number;
  pagina = 0;
  itensPorPagina = 15;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtosUrl: string;
  filesUrl: string;

  constructor(
    private http: MoneyHttp
  ) {
    this.produtosUrl = `${environment.apiUrl}/produtos`;
    this.filesUrl = `${environment.apiUrl}/files`;
  }

  urlUploadImagem(): string {
    return `${this.filesUrl}/upload`;
  }

  pesquisar(filtro: ProdutoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.codigo) {
      params = params.append('codigo', filtro.codigo);
    }

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.dataCadastro) {
      params = params.append('dataCadastro', moment(filtro.dataCadastro).format('YYYY-MM-DD'))
    }

    if (filtro.principal) {
      params = params.append('principal', filtro.principal.toString());
    }

    if (filtro.categoria) {
      params = params.append('categoria', filtro.categoria.toString());
    }

    return this.http.get<any>(`${this.produtosUrl}`, { params })
      .toPromise()
      .then(response => {
        const produtos = response.content;

        const resultado = {
          produtos,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodos(): Promise<any> {
    return this.http.get<any>(`${this.produtosUrl}/listar`)
      .toPromise();
      //.then(response => response.content);
  }

  listarTodosProdutoDto(primeiroRegNull: number): Promise<any> {
    return this.http.get<any>(`${this.produtosUrl}/listar/${primeiroRegNull}`)
      .toPromise();
      //.then(response => response.content);
  }

  listarPrincipais(): Promise<any> {
    return this.http.get<any>(`${this.produtosUrl}/principais`)
      .toPromise();
      //.then(response => response.content);
  }

  listarPorCategoria(id: number): Promise<any> {
    return this.http.get<any>(`${this.produtosUrl}/categoria/${id}`)
      .toPromise();
      //.then(response => response.content);
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.produtosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(produto: Produto): Promise<Produto> {
    return this.http.post<Produto>(this.produtosUrl, produto)
      .toPromise();
  }

  atualizar(produto: Produto): Promise<Produto> {
    return this.http.put<Produto>(`${this.produtosUrl}/${produto.id}`, produto)
      .toPromise()
      .then(response => {
        const produtoAlterado = response;

        this.converterStringsParaDatas(produtoAlterado);

        return produtoAlterado;
      });
  }

  buscarPorId(id: number): Promise<Produto> {
    return this.http.get<Produto>(`${this.produtosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const produto = response;

        this.converterStringsParaDatas(produto);

        return produto;
      });
  }

  private converterStringsParaDatas(produto: Produto) {
    produto.dataCadastro = moment(produto.dataCadastro, 'YYYY-MM-DD').toDate();
  }

  gerar(tipoArquivo: string, idUsuario: any, idImobiliaria: any, produto: Produto) {
    let params = new HttpParams({
      fromObject: {
        tipoArquivo: tipoArquivo,
        idUsuario: idUsuario,
        idImobiliaria: idImobiliaria
      }
    });
    const httpOptions = {
      responseType: 'blob' as 'json',
      params
    };

    return this.http.post(`${this.produtosUrl}/gerar`, produto, httpOptions)
      .toPromise();
  }

  portfolio(filtro: PortfolioFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.principal) {
      params = params.append('principal', filtro.principal.toString());
    }

    if (filtro.categoria) {
      params = params.append('categoria', filtro.categoria.toString());
    }

    return this.http.get<any>(`${this.produtosUrl}/portfolio`, { params })
      .toPromise()
      .then(response => {
        const produtosPortfolio = response.content;

        const resultado = {
          produtosPortfolio,
          total: response.totalElements
        };

        return resultado;
      })
  }
}

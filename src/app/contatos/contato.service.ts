import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { MoneyHttp } from './../seguranca/money-http';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

import { Contato } from './../core/model';

export class ContatoFiltro {
  nome: string;
  dataCadastro: Date;
  conferido: boolean;
  pagina = 0;
  itensPorPagina = 15;
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  contatosUrl: string;

  constructor(
    private http: MoneyHttp,
    private httpClient: HttpClient
    ) {
    this.contatosUrl = `${environment.apiUrl}/contatos`;
  }

  pesquisar(filtro: ContatoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.dataCadastro) {
      params = params.append('dataCadastro', moment(filtro.dataCadastro).format('YYYY-MM-DD'))
    }

    if (filtro.conferido) {
      params = params.append('conferido', filtro.conferido.toString());
    }

    return this.http.get<any>(`${this.contatosUrl}`, { params })
      .toPromise()
      .then(response => {
        const contatos = response.content;

        const resultado = {
          contatos,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodos(): Promise<any> {
    return this.http.get(`${this.contatosUrl}/listar`)
      .toPromise();
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.contatosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(contato: Contato): Promise<Contato> {
    return this.http.post<Contato>(this.contatosUrl, contato)
      .toPromise();
  }

  adicionarNovo(contato: Contato): Promise<Contato> {
    return this.httpClient.post<Contato>(`${this.contatosUrl}/novo`, contato)
      .toPromise();
  }

  atualizar(contato: Contato): Promise<Contato> {
    return this.http.put<Contato>(`${this.contatosUrl}/${contato.id}`, contato)
      .toPromise()
      .then(response => {
        const contatoAlterado = response;

        this.converterStringsParaDatas(contatoAlterado);

        return contatoAlterado;
      });
  }

  buscarPorId(id: number): Promise<Contato> {
    return this.http.get<Contato>(`${this.contatosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const contato = response;

        this.converterStringsParaDatas(contato);

        return contato;
      });
  }

  mudarConferido(id: number, conferido: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.contatosUrl}/${id}/conferido`, conferido, { headers })
      .toPromise()
      .then(() => null);
  }

  private converterStringsParaDatas(contato: Contato) {
      contato.dataCadastro = moment(contato.dataCadastro, 'YYYY-MM-DD').toDate();
  }

}

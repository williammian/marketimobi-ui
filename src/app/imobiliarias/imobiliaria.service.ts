import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { MoneyHttp } from './../seguranca/money-http';

import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

import { Imobiliaria } from './../core/model';

export class ImobiliariaFiltro {
  nome: string;
  dataCadastro: Date;
  status: string;
  pagina = 0;
  itensPorPagina = 15;
}

@Injectable({
  providedIn: 'root'
})
export class ImobiliariaService {

  imobiliariasUrl: string;
  filesUrl: string;

  constructor(
    private http: MoneyHttp
    ) {
    this.imobiliariasUrl = `${environment.apiUrl}/imobiliarias`;
    this.filesUrl = `${environment.apiUrl}/files`;
  }

  urlUploadImagem(): string {
    return `${this.filesUrl}/upload`;
  }

  pesquisar(filtro: ImobiliariaFiltro): Promise<any> {
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

    if (filtro.status) {
      params = params.append('status', filtro.status);
    }

    return this.http.get<any>(`${this.imobiliariasUrl}`, { params })
      .toPromise()
      .then(response => {
        const imobiliarias = response.content;

        const resultado = {
          imobiliarias,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodos(): Promise<any> {
    return this.http.get(`${this.imobiliariasUrl}/listar`)
      .toPromise();
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.imobiliariasUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(imobiliaria: Imobiliaria): Promise<Imobiliaria> {
    return this.http.post<Imobiliaria>(this.imobiliariasUrl, imobiliaria)
      .toPromise();
  }

  atualizar(imobiliaria: Imobiliaria): Promise<Imobiliaria> {
    return this.http.put<Imobiliaria>(`${this.imobiliariasUrl}/${imobiliaria.id}`, imobiliaria)
      .toPromise()
      .then(response => {
        const imobiliariaAlterada = response;

        this.converterStringsParaDatas(imobiliariaAlterada);

        return imobiliariaAlterada;
      });
  }

  buscarPorId(id: number): Promise<Imobiliaria> {
    return this.http.get<Imobiliaria>(`${this.imobiliariasUrl}/${id}`)
      .toPromise()
      .then(response => {
        const imobiliaria = response;

        this.converterStringsParaDatas(imobiliaria);

        return imobiliaria;
      });
  }

  mudarStatus(id: number, status: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.imobiliariasUrl}/${id}/status`, status, { headers })
      .toPromise()
      .then(() => null);
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(`${this.imobiliariasUrl}/listar`)
      .toPromise();
      //.then(response => response.content);
  }

  listarTodasImobiliariaDto(primeiroRegNull: number): Promise<any> {
    return this.http.get<any>(`${this.imobiliariasUrl}/listar/${primeiroRegNull}`)
      .toPromise();
      //.then(response => response.content);
  }

  private converterStringsParaDatas(imobiliaria: Imobiliaria) {
    imobiliaria.dataCadastro = moment(imobiliaria.dataCadastro, 'YYYY-MM-DD').toDate();
  }

}

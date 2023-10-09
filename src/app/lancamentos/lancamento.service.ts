import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

import { MoneyHttp } from './../seguranca/money-http';

export class LancamentoFiltro {
  dataInicial: Date;
  dataFinal: Date;
  imobiliaria: number;
  usuario: number;
  produto: number;
  pagina = 0;
  itensPorPagina = 15;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl: string;
  
  constructor(
    private http: MoneyHttp
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.dataInicial) {
      params = params.append('dataInicial', moment(filtro.dataInicial).format('YYYY-MM-DD'))
    }

    if (filtro.dataFinal) {
      params = params.append('dataFinal', moment(filtro.dataFinal).format('YYYY-MM-DD'))
    }

    if (filtro.imobiliaria) {
      params = params.append('imobiliaria', filtro.imobiliaria.toString());
    }

    if (filtro.usuario) {
      params = params.append('usuario', filtro.usuario.toString());
    }

    if (filtro.produto) {
      params = params.append('produto', filtro.produto.toString());
    }

    return this.http.get<any>(`${this.lancamentosUrl}/pesquisar`, { params })
      .toPromise()
      .then(response => {
        const lancamentos = response.content;

        const resultado = {
          lancamentos,
          total: response.totalElements
        };

        return resultado;
      })
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

}

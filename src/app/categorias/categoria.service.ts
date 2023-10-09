import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { MoneyHttp } from './../seguranca/money-http';

import 'rxjs/add/operator/toPromise';

import { Categoria } from './../core/model';

export class CategoriaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 15;
}

@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: MoneyHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  pesquisar(filtro: CategoriaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.categoriasUrl}`, { params })
      .toPromise()
      .then(response => {
        const categorias = response.content;

        const resultado = {
          categorias,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listar(): Promise<any> {
    return this.http.get(`${this.categoriasUrl}/listar`)
      .toPromise();
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.categoriasUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(categoria: Categoria): Promise<Categoria> {
    return this.http.post<Categoria>(this.categoriasUrl, categoria)
      .toPromise();
  }

  atualizar(categoria: Categoria): Promise<Categoria> {
    return this.http.put<Categoria>(`${this.categoriasUrl}/${categoria.id}`, categoria)
      .toPromise();
  }

  buscarPorId(id: number): Promise<Categoria> {
    return this.http.get<Categoria>(`${this.categoriasUrl}/${id}`)
      .toPromise();
  }

  listarTodas(primeiroRegNull: number): Promise<any> {
    return this.http.get<any>(`${this.categoriasUrl}/listar/${primeiroRegNull}`)
      .toPromise();
  }

  listarComCategoriasPaiVazias(): Promise<any> {
    return this.http.get<any>(`${this.categoriasUrl}/listar/categoriaPaiVazia`)
      .toPromise();
  }

}

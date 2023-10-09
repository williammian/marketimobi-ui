import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

import { Usuario, Imobiliaria } from './../core/model';

import { MoneyHttp } from './../seguranca/money-http';
import { HttpClient } from '@angular/common/http';

export class UsuarioFiltro {
  nome: string;
  dataCadastro: Date;
  status: string;
  imobiliaria: number;
  pagina = 0;
  itensPorPagina = 15;
}

export class AlterarSenhaDto {
  senhaAtual: string;
  senhaNova: string;
}

export class EsqueceuSenhaDto {
  email: string;
  dataNascimento: Date;
}

@Injectable()
export class UsuarioService {

  usuariosUrl: string;
  filesUrl: string;

  constructor(
    private http: MoneyHttp,
    private httpClient: HttpClient
    ) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
    this.filesUrl = `${environment.apiUrl}/files`;
  }

  urlUploadImagem(): string {
    return `${this.filesUrl}/upload`;
  }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {
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

    if (filtro.imobiliaria) {
      params = params.append('imobiliaria', filtro.imobiliaria.toString());
    }

    return this.http.get<any>(`${this.usuariosUrl}`, { params })
      .toPromise()
      .then(response => {
        const usuarios = response.content;

        const resultado = {
          usuarios,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodos(): Promise<any> {
    return this.http.get<any>(`${this.usuariosUrl}/listar`)
      .toPromise();
      //.then(response => response.content);
  }

  listarTodosUsuarioDto(primeiroRegNull: number): Promise<any> {
    return this.http.get<any>(`${this.usuariosUrl}/listar/${primeiroRegNull}`)
      .toPromise();
      //.then(response => response.content);
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.usuariosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(usuario: Usuario): Promise<Usuario> {
    return this.http.post<Usuario>(this.usuariosUrl, usuario)
      .toPromise();
  }

  atualizar(usuario: Usuario): Promise<Usuario> {
    return this.http.put<Usuario>(`${this.usuariosUrl}/${usuario.id}`, usuario)
      .toPromise()
      .then(response => {
        const usuarioAlterado = response;

        this.converterStringsParaDatas(usuarioAlterado);

        return usuarioAlterado;
      });
  }

  buscarPorId(id: number): Promise<Usuario> {
    return this.http.get<Usuario>(`${this.usuariosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const usuario = response;

        this.converterStringsParaDatas(usuario);

        return usuario;
      });
  }

  alterarSenha(id: number, dto: AlterarSenhaDto): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.usuariosUrl}/${id}/alterarSenha`, dto, { headers })
      .toPromise()
      .then(() => null);
  }

  setarSenha(id: number, senhaNova: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.usuariosUrl}/${id}/setarSenha`, senhaNova, { headers })
      .toPromise()
      .then(() => null);
  }

  mudarStatus(id: number, status: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.usuariosUrl}/${id}/status`, status, { headers })
      .toPromise()
      .then(() => null);
  }

  esqueceuSenha(dto: EsqueceuSenhaDto): Promise<void> {
    return this.httpClient.put(`${this.usuariosUrl}/esqueceuSenha`, dto)
      .toPromise()
      .then(() => null);
  }

  private converterStringsParaDatas(usuario: Usuario) {
    usuario.dataCadastro = moment(usuario.dataCadastro, 'YYYY-MM-DD').toDate();
    usuario.dataNascimento = moment(usuario.dataNascimento, 'YYYY-MM-DD').toDate();
  }

}

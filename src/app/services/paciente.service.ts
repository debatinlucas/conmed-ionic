import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Paciente} from '../models/paciente';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  basePath = 'http://webserver.dlweb.com.br/api-v1/paciente';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError(erro: HttpErrorResponse) {
    if (erro.error instanceof ErrorEvent) {
      console.error('Aconteceu um erro', erro.error.message);
    } else {
      console.error(`Webservice status ${erro.status} body: ${erro.error}`);
    }
    return throwError('Tente novamente mais tarde');
  }

  recuperarTodos(pagina): Observable<Paciente> {
    return this.http.get<Paciente>(this.basePath + '?pagina=' + pagina + '&numreg=15')
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }

  recuperar(id): Observable<Paciente>  {
    return this.http.get<Paciente>(this.basePath + '?id=' + id)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }

  adicionar(paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.basePath, JSON.stringify(paciente), this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }

  editar(id, paciente): Observable<Paciente> {
    return this.http.put<Paciente>(this.basePath + '?id=' + id, JSON.stringify(paciente), this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }

  excluir(id): Observable<Paciente>  {
    return this.http.delete<Paciente>(this.basePath + '?id=' + id)
        .pipe(
            retry(2),
            catchError(this.handleError)
        )
  }

}

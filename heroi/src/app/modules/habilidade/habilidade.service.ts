import { Injectable } from '@angular/core';
import { Http, HttpModule, JsonpModule } from "@angular/http"

@Injectable()
export class HabilidadeService {

  private baseUrl = 'https://heroes-5b0f3.firebaseio.com';

  constructor(private http: Http) { }

  getHabilidades() {
    return this.http.get(`${this.baseUrl}/habilidade.json`)
      .toPromise()
      .then(response => this.convert(response.json()));
  }

  postCliente(email:any) {
    return this.http.post(`${this.baseUrl}/habilidade.json`, email)
      .toPromise()
      .then(response => this.convert(response.json()));
  }

  pathCliente(habilidade:any) {
    let codigo = habilidade.codigo;
    delete habilidade.codigo;
    return this.http.patch(`${this.baseUrl}/habilidade/${codigo}.json`, habilidade)
      .toPromise();
  }

  deleteCliente(codigoHabilidade:any) {
    console.log("Service " + codigoHabilidade)
    return this.http.delete(`${this.baseUrl}/habilidade/${codigoHabilidade}.json`)
      .toPromise();
  }


  private convert(parsedResponse:any) {
    if (parsedResponse) {
      return Object.keys(parsedResponse)
        .map(id => ({
          codigo: id,
          habilidade: parsedResponse[id].habilidade
        }))
        .sort((a, b) => a.habilidade.localeCompare(b.habilidade));
    }
    return []
  }

}

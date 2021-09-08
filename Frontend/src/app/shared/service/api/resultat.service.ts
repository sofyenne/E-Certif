import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Resultat } from 'src/app/shared/classes/resultat';
import { CrudService } from './generic.service';



@Injectable({
  providedIn: 'root'
})
export class ResultatService extends CrudService<Resultat> {


  static uri = environment.apiUrlResultat;


  constructor( protected readonly http: HttpClient) {
    super( http,ResultatService.uri);
    this.getAllWithPopulate()
  }

  async getAllWithPopulate() {
    let user
    user=JSON.parse(localStorage.getItem('currentUser'))
    return this.http.post(`${this.uri}/WithPopulate`, user)
        .toPromise()
        .then(res => { return <any[]>res })
}


}
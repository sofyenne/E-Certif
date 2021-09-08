import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etablissement } from 'src/app/shared/classes/Etablissement';
import { CrudService } from 'src/app/shared/service/api/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService extends CrudService<Etablissement> {

  static uri = environment.apiUrletablissement;

  constructor( protected readonly http: HttpClient) {
    super( http,EtablissementService.uri);
  }

  }


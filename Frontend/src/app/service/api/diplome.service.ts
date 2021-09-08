import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { diplome } from 'src/app/shared/classes/diplome';
import { Etablissement } from 'src/app/shared/classes/Etablissement';
import { CrudService } from 'src/app/shared/service/api/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class diplomeService extends CrudService<diplome> {

  static uri = environment.apiUrldiplome;

  constructor( protected readonly http: HttpClient) {
    super( http,diplomeService.uri);
  }

  }
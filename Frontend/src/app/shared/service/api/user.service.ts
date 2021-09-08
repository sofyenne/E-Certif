import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/classes/user';
import { CrudService } from './generic.service';




@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {


  static uri = environment.apiUrlUser;


  constructor( protected readonly http: HttpClient) {
    super( http,UserService.uri);
  }

}
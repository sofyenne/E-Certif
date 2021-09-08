import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/classes/user';
import { Observable, throwError, Subscriber, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Socket } from 'ngx-socket-io';
import { CrudService } from '../api/generic.service';


const endpoint: string = environment.apiUrlauth;

@Injectable({
  providedIn: 'root'
})

export class AuthService  extends CrudService<User>{
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: any;

  


  headers = new HttpHeaders().set('Content-Type', 'application/json');
  auth:boolean=false


publicdisplay: boolean = false;
constructor( protected readonly http: HttpClient,public router: Router) {

  super( http,endpoint);
 this.currentUser = JSON.parse(localStorage.getItem('currentUser'))

}

async verifyToken(){

  if(this.getToken()){ 
    let result=await this.http.post<any>(`${endpoint}/verifyToken`,{token:this.getToken()}).toPromise()
     if(result.status===false){ this.doLogout() }
  }
  let user
  user=JSON.parse(localStorage.getItem('currentUser'))
  return user
 

}


  // Sign-in
  signIn(user: any) {
    return this.http.post<any>(`${endpoint}/signin`, user).toPromise()        
  }
  login(user : any):Observable<any>{
    return this.http.post(`http://localhost:4000/auth/signin`, user)
  }




  
  getToken() {
    return localStorage.getItem('token');
  }

  get isAdmin(): boolean {
    let role = localStorage.getItem('role');
    return ((role !== null) && role=='Admin')
}


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('token');
    localStorage.removeItem('token')
    
    localStorage.removeItem('currentuser')

    if (removeToken == null) {
      this.router.navigate(['']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    if(id){
    let api = `${endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }else {
    return null
  }
  }

  getUserProfileByEmail(email): Observable<any> {
    let api = `${endpoint}/user-profile-by-email/${email}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = ''
    this.auth=true
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
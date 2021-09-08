import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"


export abstract class CrudService<T> {

    constructor(
        protected readonly http: any,
        protected readonly uri: string,
     
    ) { }




    add(data) {
        // .pipe(catchError(this.handleError))
        return this.http.post(`${this.uri}`, data).toPromise()

    }
    register(data) {
        // .pipe(catchError(this.handleError))
        return this.http.post(`${this.uri}/register`, data).toPromise()

    }

   
    async getAll() {

        return this.http.get(`${this.uri}`)
            .toPromise()
            .then(res => { return <any[]>res })
    }

    editOne(id) {
        return this.http.get(`${this.uri}/${id}`)
            .toPromise()
            .then(res => { return <any[]>res })
    }

    updateUser(data) {

        return this.http.patch(`${this.uri}/${data._id}`, data)
            .toPromise()
            .then(res => { return res })

    }

    delete(id) {
        return this
            .http
            .delete(`${this.uri}/${id}`).toPromise();
    }

    deleteManyUsers(data) {
        return this
            .http
            .post(`${this.uri}/deleteMany`, data).toPromise();
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

}

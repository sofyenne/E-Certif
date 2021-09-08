import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { EtablissementService } from 'src/app/service/api/etablissement.service';
import { Etablissement } from 'src/app/shared/classes/Etablissement';
import { User } from 'src/app/shared/classes/user';

import { UserService } from 'src/app/shared/service/api/user.service';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { ComponentCrud } from '../componentCrud';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .User-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
providers: [MessageService, ConfirmationService]
})
export class EtablissementComponent extends ComponentCrud<Etablissement> implements OnInit {
currentuser : any
  dataResponsable : any =[]

  constructor(private AuthServ : AuthService,private UserService : UserService, service : EtablissementService , protected messageService: MessageService, protected confirmationService: ConfirmationService,socket: Socket , private http : HttpClient ) {
    super(service , confirmationService ,messageService , Etablissement );
  
  }

  ngOnInit(): void {
   this.UserService.getAll().then(x=>this.dataResponsable=x)
this.currentuser =JSON.parse( localStorage.getItem('currentuser'))
console.log(this.currentuser)
  }


saveOrupdate(data : any){
 
if (!data._id){
  this.http.post(`http://localhost:4000/etablissement/add`,data).subscribe((res : any )=>{
    if (res.message){this.messageService.add({ severity: 'error', summary: 'error', detail: res.message, life: 4000 });}
   else this.messageService.add({ severity: 'success', summary: 'Successful', detail: res, life: 4000 });
    this.service.getAll().then(res => { this.datas = res });
  } , error =>  this.messageService.add({ severity: 'error', summary: 'error', detail: ' Failed ' +error.message, life: 3000 })
  )}

  else{
let id = data._id;
this.http.patch(`http://localhost:4000/etablissement/${id}`,data).subscribe((res : any)=>{

  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'updated', life: 3000 });
  this.service.getAll().then(res => { this.datas = res });
} , error =>  this.messageService.add({ severity: 'error', summary: 'error', detail: ' Failed ' +error.message, life: 3000 })
)  
  }
}







}

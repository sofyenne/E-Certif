import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { diplomeService } from 'src/app/service/api/diplome.service';
import { EtablissementService } from 'src/app/service/api/etablissement.service';
import { diplome } from 'src/app/shared/classes/diplome';
import { UserService } from 'src/app/shared/service/api/user.service';
import { AuthService } from 'src/app/shared/service/auth/auth.service';


import { ComponentCrud } from '../componentCrud';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends ComponentCrud<diplome>  implements OnInit {
 users : any =[]
 etablissements : any =[]
 diplome : any = []
 currentuser : any
  constructor(private AuthServ : AuthService  , service : diplomeService , protected messageService: MessageService, protected confirmationService: ConfirmationService, private http : HttpClient ,private UserService : UserService , private etablissementServie : EtablissementService) {
    super(service , confirmationService ,messageService , diplome );
  
  }

  ngOnInit() {
 this.currentuser= JSON.parse( localStorage.getItem('currentuser'))
    this.UserService.getAll().then(x=>this.users=x)
    this.etablissementServie.getAll().then(x=>this.etablissements=x)
    this.afficheDiplome()
  }

 async afficheDiplome(){
   let user = await JSON.parse( localStorage.getItem('currentuser'))
  
  this.http.post(`http://localhost:4000/diplome/WithPopulate`, user).subscribe((res)=>{
    this.diplome = res
    
  } , error => console.log(error))
}



  saveOrupdate(data : any){
 
    if (!data._id){
      this.http.post(`http://localhost:4000/diplome/create`,data).subscribe((res : any )=>{
        
      if (res.message){ this.messageService.add({ severity: 'error', summary: 'error', detail: res.message, life: 4000 });}
    
    else this.messageService.add({ severity: 'success', summary: 'Successful', detail: res, life: 4000 });
       
      } , error =>  this.messageService.add({ severity: 'error', summary: 'error', detail: ' Failed ' +error, life: 3000 })
      )}
    
      else{
    let id = data._id;
    this.http.patch(`http://localhost:4000/diplome/${id}`,data).subscribe((res : any)=>{
    
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'updated', life: 3000 });
     
    } , error =>  this.messageService.add({ severity: 'error', summary: 'error', detail: ' Failed ' +error.message, life: 3000 })
    )  
      }
    }
}

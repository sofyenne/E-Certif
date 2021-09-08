import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { User } from 'src/app/shared/classes/user';


import { UserService } from 'src/app/shared/service/api/user.service';
import { ComponentCrud } from '../../componentCrud';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss'],
    styles: [`
  :host ::ng-deep .p-dialog .User-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
    providers: [MessageService, ConfirmationService]
})

export class ListUserComponent extends ComponentCrud<User> implements OnInit {
  
  dataOrganisme
    roles=["Admin", "ResponsableEtablissement", "Recruteur","Banned"]
    rolee =["TitulaireDiplome"]
    currentuser : any 

    constructor(service: UserService,  messageService: MessageService,  confirmationService: ConfirmationService,socket: Socket) {
        super(service,messageService,confirmationService,User);

    }

  
    ngOnInit() {

       
        this.currentuser= JSON.parse( localStorage.getItem('currentuser'))

  
  }
       

    }

    




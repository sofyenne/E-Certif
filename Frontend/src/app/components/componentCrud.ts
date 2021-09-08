import { HttpClient } from "@angular/common/http";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
import { componentRegisterSessionUser } from "./componentRegisterSessionUser";

export abstract class ComponentCrud<T> extends componentRegisterSessionUser {


    constructor(protected service: any, protected messageService: any, protected confirmationService: any,protected type , protected readonly socket?: Socket ) {
        super(socket);
        this.afficheAll()
 
    }


    afficheAll(){
        this.service.getAll().then(res => { this.datas = res });
    }
    getNewType():T {
        return new this.type();
    }

    dataDialog: boolean;
    datas: T[];
    data: any;
    selectedDatas: T[];
    submitted: boolean;

    openNew() {
        this.data = this.getNewType();
        this.submitted = false;
        this.dataDialog = true;
    }

    deleteSelecteds() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected Users?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
               const  ux=await this.service.deleteManyUsers(this.selectedDatas)
                if (ux) {
                    this.service.getAll().then(res => { this.datas = res });
                    this.selectedDatas = null;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: ' Deleted', life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'error', detail: ' Failed ' +ux.message, life: 3000 });
                }

            }
        });
    }

    edit(data: any) {
        this.data = { ...data };
        this.dataDialog = true;
    }

    delete(u: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete  ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                const ux=await this.service.delete(u._id)
                if (ux===true) {
                    this.service.getAll().then(res => { this.datas = res });
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: ' Deleted', life: 3000 });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'error', detail: ' Failed '+ux.message, life: 3000 });
                }
            }
        });
    }

    hideDialog() {
        this.dataDialog = false;
        this.submitted = false;
    }

    async save() {
        this.submitted = true;
        if (this.data._id) {
            const u = await this.service.updateUser(this.data)
            if (u===true) {
                //fire 
                if(!this?.data?.banned){
                    this.socket.emit('fireUp',{toid : this.data._id})    
                }


                this.service.getAll().then(res => { this.datas = res });
                this.datas = [...this.datas];
                this.dataDialog = false;
                this.data =this.getNewType();;
              
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: ' Updated', life: 3000 });
            } else {
                
                this.messageService.add({ severity: 'error', summary: 'error', detail: ' Failed ' +u.message, life: 3000 });
            }

        }
        else {

            // this.User.image = 'User-placeholder.svg';
            const u2 = await this.service.register(this.data)
            if (u2===true) {

                this.service.getAll().then(res => { this.datas = res });
                this.datas = [...this.datas];
                this.dataDialog = false;
                this.data =this.getNewType();;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: ' Created', life: 3000 });
            } else {
              
                this.messageService.add({ severity: 'error', summary: 'error', detail: 'Failed ' +u2.message, life: 3000 });
            }
        }

       

    }
    async create(){
        this.submitted= true
      const etab = await this.service.add(this.data)
      if (etab ===true){
       console.log('done')
      }else {
              
        console.log(+etab.message) 
    }
       
       
}


   

}
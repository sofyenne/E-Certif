
import { Socket } from "ngx-socket-io";

export abstract class componentRegisterSessionUser {
    constructor(protected readonly socket?: Socket){
     /*  let user
       user=JSON.parse(localStorage.getItem('currentUser'))
       if(user){
        this.socket.emit('getUserConnected', user._id)
       }
     */


        
    }
}
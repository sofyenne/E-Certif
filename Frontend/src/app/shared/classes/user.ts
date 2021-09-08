
export class User {
    _id: string;
    reference?:string;
    nom?:string;
    prenom?:string;
    email?:string;
 
    gsm ?:string;
    role?: any;
   dateDeNaissance?:Date;
   streetAddress ?: string;

   province?:string;
   create_date:Date;
   update_date:Date;
   telValid?:boolean;
    password?:string;
  

}
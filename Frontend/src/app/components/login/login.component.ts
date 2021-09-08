import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/service/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm : FormGroup 
  constructor(private formBuilder: FormBuilder , private authservice : AuthService , private router : Router , private messageService : MessageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]});
  }
  login():void{
  
    this.authservice.signIn(this.loginForm.value).then(res => {
   if(res.token){
   
      localStorage.setItem('token' ,res.token )
      localStorage.setItem('currentuser',JSON.stringify(res.data))
      
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'res ', life: 4000 });
      if(res.data.role == 'Admin'){this.router.navigate(['/D/users/users-crud'])}else
       this.router.navigate(['/D/dashboard/diplome'])} 
      else
       this.messageService.add({ severity: 'error', summary: 'error', detail: ' Failed ' +res.msg, life: 3000 }) })
  }

}

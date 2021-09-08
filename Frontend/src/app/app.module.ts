import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './components/users/users.module';

import {EtablissementModule} from './components/etablissement/etablissement.module';
import { AuthInterceptor } from 'src/app/shared/service/auth/authconfig.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from "src/environments/environment";
import { from } from 'rxjs';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
const config: SocketIoConfig = { url: environment.apiUrl, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    SharedModule,
    UsersModule,

    ToastModule,
    EtablissementModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [

    {
   
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

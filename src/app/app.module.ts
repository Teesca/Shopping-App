import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubnavComponent } from './subnav/subnav.component';
import { DisplayComponent } from './display/display.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account';
import { AlertComponent } from './_components';
//import { LogoutComponent } from './account/logout.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        SubnavComponent,
        FooterComponent,
        DisplayComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        
       
    ],

        // provider used to create fake backe
        providers: [
            // provider used to create fake backend
            
            
        ],   
      
    bootstrap: [AppComponent]
})
export class AppModule { }
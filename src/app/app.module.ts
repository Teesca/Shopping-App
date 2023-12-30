import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubnavComponent } from './subnav/subnav.component';
import { DisplayComponent } from './display/display.component';
import { FooterComponent } from './footer/footer.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

//FireBase imports
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { UserprofileComponent } from './userprofile/userprofile.component'


@NgModule({
  declarations: [
    AppComponent,
    ItemDetailsComponent,
    RegisterComponent,
    LoginComponent,
    UserprofileComponent
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    DisplayComponent,
    SubnavComponent,
    AppRoutingModule,
    CartComponent,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDwc5VdDjdwedqedSkh8td8R3KHY8jkf1CgdyUls",
      authDomain: "the-can-do.firebaseapp.com",
      projectId: "the-can-do",
      storageBucket: "the-can-do.appspot.com",
      messagingSenderId: "132582455529",
      appId: "1:132582455529:web:9682186290c27f7ecfd878"
    }),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

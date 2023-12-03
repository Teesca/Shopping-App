import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule,FormsModule, NgIf]
})
export class NavbarComponent {

  loggedin: boolean = false; 
  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      this.loggedin = !!user; // Set to true if the user is logged in, otherwise false
    });
  }

  //signout user when the sign out button is clicked
  logout() {
    this.auth.signOut()
      .then(() => {
        console.log('User logged out successfully');
        this.loggedin = false;
        this.router.navigate(['']);
      })
      .catch((error: any) => {
        console.error('Logout failed', error);
      });
  }

  //navigate to login component when loggin button is clicked
  login() {
    this.router.navigate(['/login']);
    }
}


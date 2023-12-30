import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgIf } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserData } from '../item-details/cartInterface';
import { Subject, count, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule,FormsModule, NgIf]
})
export class NavbarComponent {

  loggedin: boolean = false;
  allproductsFromCart: any[] = [];
  total: number = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.authState.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      this.loggedin = !!user;
      this.cartCount();
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cartCount() {
    this.auth.authState.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user !== null) {
        const userDocRef = this.firestore.collection('users').doc(user.uid);

        // Use Firestore transaction to get the cart array
        this.firestore
          .firestore.runTransaction((transaction) => {
            return transaction.get(userDocRef.ref).then((userDoc) => {
              if (!userDoc.exists) {
                throw new Error('User document does not exist!');
              }
              const userData = userDoc.data() as UserData;
              this.allproductsFromCart = userData.cart || [];
              this.total = this.allproductsFromCart.length; // Update the total count
            });
          })
          .then(() => {
            console.log('Cart count updated successfully');
          })
          .catch((error) => {
            console.error('Error updating cart count:', error);
          });
      }
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


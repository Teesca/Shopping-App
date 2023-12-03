import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { SubnavComponent } from "../subnav/subnav.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';

//firebase imports
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserData } from '../item-details/cartInterface';
import { Router } from '@angular/router';


@Component({
    standalone: true,
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    imports: [
        CommonModule,
        SubnavComponent,
        NavbarComponent,
        FooterComponent,
        RouterModule
    ]
})
export class CartComponent {

  allproductsFromCart: any[] = [];
  total: number =  0;

  quantities: { [key: number]: number } = {}; // the key of the quantity will be the product's id

  constructor(private apiService: ApiService, private auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router){}

  ngOnInit() {
    // Get User Cart from firestore, if no user is logged in show empty cart
    this.auth.authState.subscribe(user=>{
      if(user !== null){
        // Reference to the user document in Firestore
        const userDocRef = this.firestore.collection('users').doc(user.uid);

          // Use Firestore transaction to get the cart array
          this.firestore.firestore.runTransaction((transaction) => {
            return transaction.get(userDocRef.ref).then((userDoc) => {
              if (!userDoc.exists) {
                throw new Error('User document does not exist!');
              }
              const userData = userDoc.data() as UserData;
              this.allproductsFromCart = userData.cart || [];

              //initialise quantity for each product in cart
              this.allproductsFromCart.forEach(product => {
                this.quantities[product.id] = 1;
              });

              // adding the total of the prices in the cart
              this.allproductsFromCart.forEach(product => {
                this.total +=  product.price;
              });
              this.total=this.roundToTwoDecimals(this.total);
            });
          })
          
      }else{
        //When you logout while on cart it reload the cart but this time with no user's data
          this.router.navigate(['/cart']);
      }
    });
  }


  plus(productId: number) {
    this.quantities[productId] += 1;
    this.total += this.allproductsFromCart.find(item => item.id === productId).price; //find the product by price and  add the price to total
    this.total=this.roundToTwoDecimals(this.total);
  }

  minus(productId: number) {
    if (this.quantities[productId] > 1) {
      this.quantities[productId] -= 1;
      this.total -= this.allproductsFromCart.find(item => item.id === productId).price; //find the product by price and subtract the price from total
      this.total=this.roundToTwoDecimals(this.total);
      
    }
  }


  deleteProduct(productId: number) {
    this.auth.authState.subscribe(user=>{
            if(user !== null){
                
            // Reference to the user document in Firestore
            const userDocRef = this.firestore.collection('users').doc(user.uid);

            // Use Firestore transaction to update the cart array
            this.firestore.firestore.runTransaction((transaction) => {
              return transaction.get(userDocRef.ref).then((userDoc) => {
                if (!userDoc.exists) {
                  throw new Error('User document does not exist!');
                }

                const userData = userDoc.data() as UserData;
                let currentCart = userData.cart || [];
                // Remove the product to the cart array 
                currentCart = currentCart.filter(obj => obj.id !== productId); ;
                // Update the cart array in the user document
                transaction.update(userDocRef.ref, { cart: currentCart });

                return currentCart;
              });
            })
            .then((updatedCart) => {
              // Subtract price from total
              this.total -= this.allproductsFromCart.find(item => item.id === productId).price;
              this.total=this.roundToTwoDecimals(this.total);

              // Updated cart frontend too
              this.allproductsFromCart = this.allproductsFromCart.filter(product => product.id !== productId);
              
              console.log('Cart updated successfully:', updatedCart);
            })
            .catch((error) => {
              console.error('Error adding item to cart:', error);
            });
        }
      })

  }

  private roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }
}

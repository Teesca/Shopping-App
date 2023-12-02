import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { UserData } from './cartInterface';


//firebase imports
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})



export class ItemDetailsComponent {

  productDeatail: any = {};
 

  
  constructor(private apiService: ApiService,private route: ActivatedRoute,private auth: AngularFireAuth, private firestore: AngularFirestore){}

  ngOnInit() {
    // Getting the itemId from the route parameters
    this.route.paramMap.subscribe(params => {
      const itemId = Number(params.get('id'));

      // Calling the API service to fetch item details
      this.apiService.getItemDetails(itemId).subscribe(
            (data) => {
              this.productDeatail = data;
            },
            (error) => {
              console.error('Error fetching product details:', error);
            }
          );
        });
    }

    addToCart(product: any) {
      this.auth.authState.subscribe(user=>{
            if(user !== null){
                
            // Reference to the user document in Firestore
            const userDocRef = this.firestore.collection('users').doc(user.uid);
      
            // Using Firestore transaction to update the cart array
            this.firestore.firestore.runTransaction((transaction) => {
              return transaction.get(userDocRef.ref).then((userDoc) => {
                if (!userDoc.exists) {
                  throw new Error('User document does not exist!');
                }
      
                const userData = userDoc.data() as UserData;
                const currentCart = userData.cart || [];
                // Add the new product to the cart array if rpoduct doesn't exist init
               if(!this.productExists(product.id,currentCart)){
                  currentCart.push(product);
                  // Update the cart array in the user document
                  transaction.update(userDocRef.ref, { cart: currentCart });
                  console.log('Item added to cart successfully:', product);
               }
      
                return currentCart;
              });
            })
            .then((updatedCart) => {
              console.log('Cart updated successfully:', updatedCart);
            })
            .catch((error) => {
              console.error('Error adding item to cart:', error);
            });
        }
      })
  
    }


    productExists(id: number, arr: any) {
      return arr.some((el: { id: number; }) => {return el.id === id}); 
    }

    
    

}

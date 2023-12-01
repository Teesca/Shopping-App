import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent {

  productDeatail: any = {};
  buttonClicked: boolean = false;
  isProductInCart?: boolean;

  
  constructor(private apiService: ApiService,private route: ActivatedRoute){}

  ngOnInit() {
    // Get the itemId from the route parameters
    this.route.paramMap.subscribe(params => {
      const itemId = Number(params.get('id'));

      // Call the API service to fetch item details
      this.apiService.getItemDetails(itemId).subscribe(
            (data) => {
              this.productDeatail = data;
              console.log('Data received:', this.productDeatail);
            },
            (error) => {
              console.error('Error fetching product details:', error);
            }
          );
        });
    }

    addToCart() {
      this.checkProductInCart();
      if(this.isProductInCart == false){
        this.apiService.addToCart(this.productDeatail,String(localStorage.getItem('email'))).subscribe(
          (data) => {
            console.log("added item to cart");
          },
          (error) => {
            console.error('Failed to add item to cart.', error);
          }
        );
      }

    }


    private checkProductInCart() {
      const userEmail = String(localStorage.getItem('email'));
  
      // Call the API service to get the user's cart
      this.apiService.getUserCart(userEmail).subscribe(
        (data) => {
          const userCart = data[0].cart;
          // Check if the product is in the user's cart
          console.log(userCart)
          this.isProductInCart = false;
          for (let i = 0; i < userCart.length; i++) {
            if (userCart[i].id === this.productDeatail.id) {
              console.log("PRODUCT EXISTS");
              this.isProductInCart = true;
              break;
            }
          }
        },
        (error) => {
          console.error('Failed to check if product is in cart.', error);
        }
      );
    }

}

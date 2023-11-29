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

  

}

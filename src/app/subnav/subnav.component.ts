import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  standalone: true,
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.css']
})
export class SubnavComponent {
  allBackgroundColor: string = 'black';
  menBackgroundColor: string = '';
  womenBackgroundColor: string = '';
  electronicsBackgroundColor: string = '';
  jewelryBackgroundColor: string = '';

  allTextColor: string = 'white';
  womenTextColor: string = 'grey';
  menTextColor: string = 'grey';
  electronicsTextColor: string = 'grey';
  jeweleryTextColor: string = 'grey';

  menClothingData: any[] = [];

  constructor(private apiService: ApiService){}

  

  changeBackgroundColor(category: string) {
    // Change the background color based on the category
    switch (category) {
      case 'all':
        this.allBackgroundColor = 'black';
        this.allTextColor = 'white';

        // change other background colors 
        this.menBackgroundColor = '';
        this.womenBackgroundColor= '';
        this.electronicsBackgroundColor = '';
        this.jewelryBackgroundColor = '';
        this.apiService.showAllProducts();

        // change other text colors 
        this.womenTextColor = 'grey';
        this.menTextColor = 'grey';
        this.electronicsTextColor = 'grey';
        this.jeweleryTextColor = 'grey';
        break;
      case 'men':
        this.menBackgroundColor = 'black';
        this.menTextColor = 'white';

        // change other background colors 
        this.allBackgroundColor = '';
        this.womenBackgroundColor= '';
        this.electronicsBackgroundColor = '';
        this.jewelryBackgroundColor = '';
        this.apiService.showMenClothes();

        // change other text colors 
        this.allTextColor = 'grey';
        this.womenTextColor = 'grey';
        this.electronicsTextColor = 'grey';
        this.jeweleryTextColor = 'grey';
        break;
      case 'women':
        this.womenBackgroundColor = 'black';
        this.womenTextColor = 'white';

        // change other background colors 
        this.allBackgroundColor = '';
        this.menBackgroundColor = '';
        this.electronicsBackgroundColor = '';
        this.jewelryBackgroundColor = '';
        this.apiService.showWomenClothes();

        // change other text colors 
        this.allTextColor = 'grey';
        this.menTextColor = 'grey';
        this.electronicsTextColor = 'grey';
        this.jeweleryTextColor = 'grey';
        break;
      case 'electronics':
        this.electronicsBackgroundColor = 'black';
        this.electronicsTextColor = 'white';

        // change other background colors 
        this.allBackgroundColor = '';
        this.menBackgroundColor = '';
        this.womenBackgroundColor= '';
        this.jewelryBackgroundColor = '';
        this.apiService.showElectronics();

        // change other text colors 
        this.womenTextColor = 'grey';
        this.menTextColor = 'grey';
        this.allTextColor = 'grey';
        this.jeweleryTextColor = 'grey';
        break;
      case 'jewelry':
        this.jewelryBackgroundColor = 'black';
        this.jeweleryTextColor = 'white'; 

        // change other background colors 
        this.allBackgroundColor = '';
        this.menBackgroundColor = '';
        this.womenBackgroundColor= '';
        this.electronicsBackgroundColor = ''; 
        this.apiService.showJewelery();

        // change other text colors 
        this.womenTextColor = 'grey';
        this.menTextColor = 'grey';
        this.electronicsTextColor = 'grey';
        this.allTextColor = 'grey';
        break;
      default:
        break;
    }
  }
}

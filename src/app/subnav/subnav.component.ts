import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
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

  menClothingData: any[] = [];

  constructor(private apiService: ApiService){}

  changeBackgroundColor(category: string) {
    // Change the background color based on the category
    switch (category) {
      case 'all':
        this.allBackgroundColor = 'black';
        this.menBackgroundColor = '';
        this.womenBackgroundColor= '';
        this.electronicsBackgroundColor = '';
        this.jewelryBackgroundColor = '';
        this.apiService.showAllProducts();
        break;
      case 'men':
        this.menBackgroundColor = 'black';
        this.allBackgroundColor = '';
        this.womenBackgroundColor= '';
        this.electronicsBackgroundColor = '';
        this.jewelryBackgroundColor = '';
        this.apiService.showMenClothes();
        break;
      case 'women':
        this.womenBackgroundColor = 'black';
        this.allBackgroundColor = '';
        this.menBackgroundColor = '';
        this.electronicsBackgroundColor = '';
        this.jewelryBackgroundColor = '';
        this.apiService.showWomenClothes();
        break;
      case 'electronics':
        this.electronicsBackgroundColor = 'black';
        this.allBackgroundColor = '';
        this.menBackgroundColor = '';
        this.womenBackgroundColor= '';
        this.jewelryBackgroundColor = '';
        this.apiService.showElectronics();
        break;
      case 'jewelry':
        this.jewelryBackgroundColor = 'black';
        this.allBackgroundColor = '';
        this.menBackgroundColor = '';
        this.womenBackgroundColor= '';
        this.electronicsBackgroundColor = '';
        this.apiService.showJewelery();
        break;
      default:
        break;
    }
  }
}

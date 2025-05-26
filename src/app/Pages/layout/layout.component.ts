import { Component } from '@angular/core';
import { ProductService } from '../../Service/ProductService/product.service';
import { NgIcon, NgIconsModule, provideIcons } from '@ng-icons/core';
// import heroHomeSolid from '@ng-icons/heroicons';
import {bootstrapBellFill, bootstrapHeart, bootstrapHeartFill, bootstrapSearch, bootstrapSliders, bootstrapSuitHeart,bootstrapPersonFill,bootstrapHouseFill,bootstrapGear,bootstrapGearFill,bootstrapCollection,bootstrapHouse,bootstrapCollectionFill} from '@ng-icons/bootstrap-icons'
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../Shared/footer/footer.component";

@Component({
  selector: 'app-layout',
  imports: [NgIcon, RouterOutlet, CommonModule, FormsModule, RouterLink, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  viewProviders:[provideIcons({bootstrapSearch,bootstrapHeart,bootstrapSliders,bootstrapSuitHeart,bootstrapHeartFill,bootstrapGear,bootstrapBellFill,bootstrapPersonFill,bootstrapHouseFill,bootstrapGearFill,bootstrapCollection,bootstrapHouse,bootstrapCollectionFill})]
})
export class LayoutComponent {
  // icons={heroHomeSolid};
  activeTab:string = 'home'
  // constructor( private service:ProductService) {}

  // ngOnInit() {
  //   this.service.GetProducts().subscribe((response) => {
  //     console.log('Products:', response);
  //   });
  // }
  toggleIcon(tab:string){
    this.activeTab =tab
  }
}

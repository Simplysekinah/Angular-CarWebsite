import { Component } from '@angular/core';
import { HeroBannerComponent } from "../../Shared/hero-banner/hero-banner.component";
import { CarCardComponent } from '../../Shared/car-card/car-card.component';
import { ProductService } from '../../Service/ProductService/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { uploadProduct } from '../../Interface/auth';

@Component({
  selector: 'app-dashboard',
  imports: [HeroBannerComponent, CarCardComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  carImg = 'car1.png'
  carImgs = 'car2.png'
  backImg = 'back1.png'
  backImgs = 'back2.png'
  isfavourites = false
  //  carData: any[] = [];
  carData: uploadProduct | any;
  carDatas: uploadProduct | any;
  _id: string = ''
  constructor(private service: ProductService) { }
  ngOnInit() {
    this.service.GetProductsbyCategory().subscribe((response) => {
      console.log('Products:', response);
      this.carData = response.products;
      console.log(this.carData);
    })
    this.service.GetProductsbyCategorys().subscribe((response) => {
      console.log('Products:', response);
      this.carDatas = response.products;
      console.log(this.carDatas);
    })
  }
  onClickRent() {
    console.log('object');
  }
  handleCarSelection(_id: string) {
    console.log("Selected Car ID:", _id);
    this._id = _id
    console.log(_id);
    this.service.GetProductsbyId(_id).subscribe((response) => {
      console.log('Products:', response);
      // this.carData = response.products;
      // console.log(this.carData);
    })
  }
  favourite(_id:string){
    console.log(_id);
    this.isfavourites =!this.isfavourites
  }

}

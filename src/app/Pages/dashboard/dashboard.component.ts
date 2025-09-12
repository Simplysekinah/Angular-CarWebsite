import { Component } from '@angular/core';
import { HeroBannerComponent } from "../../Shared/hero-banner/hero-banner.component";
import { CarCardComponent } from '../../Shared/car-card/car-card.component';
import { ProductService } from '../../Service/ProductService/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { favourite, uploadProduct } from '../../Interface/auth';
import { Router } from '@angular/router';
import { CarRentalService } from '../../Service/Car-rental/car-rental.service';

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
  isfavourites: Set<string> = new Set();
  //  carData: any[] = [];
  carData: uploadProduct | any;
  carDatas: uploadProduct | any;
  _id: string = ''
  carId: string = ''
  userId: any = localStorage.getItem('_id')
  favourites: favourite | any;


  constructor(private service: ProductService, private router: Router, private carservice: CarRentalService) { }
  ngOnInit() {
    this.service.GetProductsbyCategory().subscribe((response) => {
      // console.log('Products:', response);
      this.carData = response.products;
      // console.log(this.carData);
    })
    this.service.GetProductsbyCategorys().subscribe((response) => {
      // console.log('Products:', response);
      this.carDatas = response.products;
      // console.log(this.carDatas);
    })
    this.carservice.getFavourite(this.userId).subscribe((response) => {
    const favIds = response.favorites.map((fav: any) => fav.carId);
    this.isfavourites = new Set(favIds); // populate the Set
    // console.log("User favourites:", this.isfavourites);
  });
  }
  onClickRent() {
    // console.log('object');
  }
  handleCarSelection(_id: string) {
    // console.log("Selected Car ID:", _id);
    this._id = _id
    // console.log(_id);
    this.router.navigate([`/carDetails/${this._id}`])
  }

  favourite(_id: string) {
    this.carId = _id
    // this.isfavourites = !this.isfavourites
    this.favourites = {
      carId: this.carId,
      userId: this.userId
    };
    this.carservice.addFavourite(this.favourites).subscribe((response) => {
      if (this.isfavourites.has(this.carId)) {
        this.isfavourites.delete(this.carId);
      } else {
        this.isfavourites.add(this.carId);
      }
      // console.log(response)
    })



  }



}

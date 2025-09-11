import { Component } from '@angular/core';
import { CarRentalService } from '../../Service/Car-rental/car-rental.service';
import { CarCardComponent } from "../../Shared/car-card/car-card.component";
import { favourite, uploadProduct } from '../../Interface/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Service/ProductService/product.service';

@Component({
  selector: 'app-favourites',
  imports: [CarCardComponent, CommonModule, FormsModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
  userId: any = localStorage.getItem('_id')
  isfavourites: Set<string> = new Set();
  favourites: favourite | any;
  _id: string = ''
  carId: string = ''
  id: string[] = []
  carDatas: uploadProduct | any;
  constructor(private carservice: CarRentalService, private router: Router, private service: ProductService) { }

  ngOnInit() {
    console.log(this.userId);
    this.carservice.getFavourite(this.userId).subscribe((response) => {
      const favIds = response.favorites.map((fav: any) => fav.carId);
      this.isfavourites = new Set(favIds); // populate the Set
      // console.log("User favourites:", this.isfavourites);
    });
    this.carservice.getFavourite(this.userId).subscribe(response => {
      this.id = response.favorites.map((fav: any) => fav.carId);
      // console.log("Favourite response:", response);
      // console.log("Extracted IDs:", this.id);

      if (this.id.length > 0) {
        this.service.GetProductsbyIds(this.id).subscribe((response) => {
          // console.log("Products:", response.products);
          this.carDatas = response.products;
        });
      } else {
        // console.log("No favourite IDs found.");
        this.carDatas = [];
      }
    });
  }


  handleCarSelection(_id: string) {
    console.log("Selected Car ID:", _id);
    this._id = _id
    console.log(_id);
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
      console.log(response)
    })



  }
}

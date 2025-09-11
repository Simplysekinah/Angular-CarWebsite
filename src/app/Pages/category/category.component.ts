import { Component } from '@angular/core';
import { ProductService } from '../../Service/ProductService/product.service';
import { CarCardComponent } from "../../Shared/car-card/car-card.component";
import { Router } from '@angular/router';
import { uploadProduct } from '../../Interface/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [CarCardComponent,FormsModule,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent {
  types: String = 'Sport';
  productOptions: Array<uploadProduct> = []
  filteredOptions: Array<uploadProduct> = []
  isfavourites = false
    _id: string = ''
    carData: uploadProduct | any;
  constructor(private service: ProductService, private router:Router) {

  }
  ngOnInit() {
    this.service.GetProducts().subscribe((response) => {
      this.productOptions = response.products
      this.filteredOptions = this.productOptions.filter((product: { type: string; }) => product.type == 'Sport')
      this.carData = this.filteredOptions
    })
  }
  changeCar(option: string) {
    this.types = option
    this.filteredOptions = this.productOptions.filter((product: { type: string; }) => product.type == this.types)
    this.carData = this.filteredOptions
  }
  handleCarSelection(_id: string) {
    // console.log("Selected Car ID:", _id);
    this._id = _id
    // console.log(_id);
    this.router.navigate([`/carDetails/${this._id}`])
    // this.service.GetProductsbyId(_id).subscribe((response) => {
    //   console.log('Products:', response);
    // })
  }
  favourite(_id:string){
    // console.log(_id);
    this.isfavourites =!this.isfavourites
  }
}

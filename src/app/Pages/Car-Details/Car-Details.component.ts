import { Component } from '@angular/core';
import { uploadProduct } from '../../Interface/auth';
import { ProductService } from '../../Service/ProductService/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cardetails',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './Car-Details.component.html',
  styleUrl: './Car-Details.component.css'
})
export class CarDetailsComponent {
  _id:any;
  carDetails:uploadProduct |any
  backImg = 'back1.png'
  available:string = ""

  constructor(private service: ProductService, private router:Router, private route:ActivatedRoute) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._id =this.route.snapshot.paramMap.get('_id')
    this.service.GetProductsbyId(this._id).subscribe((response) => {
      // console.log('Products:', response);
      this.carDetails =response.products
      // console.log(this.carDetails);
      if (this.carDetails.available == false) {
      alert('not available')
      }
    })
  }
  payment(){
    if (this.carDetails.available == true) {
      alert('available')
      this.router.navigate([`paymentpage/${this._id}`])
    }else{
      alert("out of stock")
    }

  }
}

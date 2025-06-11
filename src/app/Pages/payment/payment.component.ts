import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { uploadProduct } from '../../Interface/auth';
import { ProductService } from '../../Service/ProductService/product.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  _id:any;
  carDetails:uploadProduct |any
  backImg = 'back2.png'
  rentalForm: FormGroup;


  constructor(private service: ProductService, private router:Router, private route:ActivatedRoute,private fb: FormBuilder) { 
     this.rentalForm = this.fb.group({
      rentalType: [''], // Stores selected radio option
      pickUpLocation: [''],
      pickUpDate: [''],
      pickUpTime: [''],
      dropOffLocation: [''],
      dropOffDate: [''],
      dropOffTime: [''],
      names:'',
      phoneN:'',
      town:'',
      address:''
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._id =this.route.snapshot.paramMap.get('_id')
    this.service.GetProductsbyId(this._id).subscribe((response) => {
      // console.log('Products:', response);
      this.carDetails =response.products
      // console.log(this.carDetails);
    })
  }
}

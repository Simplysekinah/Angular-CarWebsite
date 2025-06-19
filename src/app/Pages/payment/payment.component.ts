import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { uploadProduct } from '../../Interface/auth';
import { ProductService } from '../../Service/ProductService/product.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { HttpClient } from '@angular/common/http';
import { CarRentalService } from '../../Service/Car-rental/car-rental.service';

@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  _id: any;
  carDetails: uploadProduct | any
  backImg = 'back2.png'
  rentalForm!: FormGroup;
  minDate: string = new Date().toISOString().split('T')[0]; // Restrict past// Today's date


  constructor(private service: ProductService, private rentService: CarRentalService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient) {
    this.rentalForm = this.fb.group({
      rentalType: [''], // Stores selected radio option
      pickUpLocation: ['', [Validators.required]],
      pickUpDate: ['', [Validators.required]],
      pickUpTime: ['', [Validators.required]],
      dropOffLocation: [''],
      dropOffDate: [''],
      dropOffTime: [''],
      names: ['', [Validators.required]],
      phoneN: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      town: ['', [Validators.required]],
      address: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    });

    // cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
    // expirationDate: new FormControl('', [Validators.required]),
    // cvc: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._id = this.route.snapshot.paramMap.get('_id')
    this.service.GetProductsbyId(this._id).subscribe((response) => {
      // console.log('Products:', response);
      this.carDetails = response.products
      // console.log(this.carDetails);
    })
  }
  rentalDays: number = 0;

 calculateRentalDays() {
  if (!this.rentalForm.value.pickUpDate || !this.rentalForm.value.dropOffDate) {
    return; // Ensure values exist before processing
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to prevent errors

  const pickUpDate = new Date(this.rentalForm.value.pickUpDate);
  pickUpDate.setHours(0, 0, 0, 0); // Ensure only the date is compared

  const dropOffDate = new Date(this.rentalForm.value.dropOffDate);
  dropOffDate.setHours(0, 0, 0, 0);

  console.log('Today:', today);
  console.log('Pick-Up Date:', pickUpDate);

  // **Fix 1:** Check if Pick-Up Date is Before Today
  if (pickUpDate.getTime() < today.getTime()) {
    this.toastr.error('Pick-up date cannot be in the past!');
    alert('Pick-up date cannot be in the past!');
    this.rentalForm.controls['pickUpDate'].setValue(''); // Reset invalid date
    return;
  }

  // **Fix 2:** Ensure Drop-Off is After Pick-Up
  if (dropOffDate.getTime() < pickUpDate.getTime()) {
    this.toastr.error('Drop-off date must be after pick-up date!');
    this.rentalDays = 0;
    return;
  }

  // **Fix 3:** Correct Rental Days Calculation
  this.rentalDays = Math.ceil((dropOffDate.getTime() - pickUpDate.getTime()) / (1000 * 3600 * 24));
  console.log(this.rentalDays);
}

  // calculateRentalDays() {
  //   const pickUpDate = new Date(this.rentalForm.value.pickUpDate);
  //   const dropOffDate = new Date(this.rentalForm.value.dropOffDate);

  //   if (pickUpDate && dropOffDate && dropOffDate >= pickUpDate) {
  //     const timeDiff = dropOffDate.getTime() - pickUpDate.getTime();
  //     this.rentalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
  //   } else {
  //     this.rentalDays = 0;
  //   }

  // }

  SubmitPayment() {
    console.log('Processing Payment...');

    // Check if form is valid
    if (this.rentalForm.valid) {
      this.toastr.error('Fill all required inputs!');
      return;
    }
    console.log(this._id);
    const _id = localStorage.getItem('_id')
    // Ensure no empty values
    let amount = this.carDetails.price * this.rentalDays
    const formData = { ...this.rentalForm.value, _id: _id,amount:amount };
    console.log(formData);
    if (
      !formData.names ||
      !formData.phoneN ||
      !formData.address ||
      !formData.town ||
      !formData.pickUpLocation ||
      !formData.pickUpDate ||
      !formData.pickUpTime ||
      !formData.paymentMethod ||
      !formData.dropOffLocation ||
      !formData.dropOffDate ||
      !formData.dropOffTime ||
      !formData.terms
    ) {
      this.toastr.error('All fields must be filled!');
      return;
    }

    // Notify user of successful submission
    this.toastr.success('Form Submitted Successfully!');
    console.log('Form Submitted:', formData);

    // Redirect to payment gateway after successful rental submission
    if (formData.paymentMethod === 'PayPal') {
      window.location.href = 'http://localhost:5000/pay'; // Replace with actual PayPal route
    }

    // Send rental details to backend
    this.rentService.RentCar(formData).subscribe({
      next: (response) => {
        console.log('Payment Response:', response);

      },
      error: (err) => {
        console.error('Payment Error:', err);
        this.toastr.error('Payment Failed!');
      },
    });
  }
}
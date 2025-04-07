import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../Service/ProductService/product.service';

@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.css',
})
export class UploadProductComponent {
  UploadForm!: FormGroup;
  submitted = false;
  success = '';
  selectedFile: string | null = null; // Store the file object
  show: any; // Store the file object

  constructor(
    private router: Router,
    private FB: FormBuilder,
    private service: ProductService
  ) {}

  ngOnInit() {
    this.UploadForm = this.FB.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required]],
      availability: [false], // Checkbox should have `false` as default
      color: ['', [Validators.required]],
      image: [null, [Validators.required]], // Set image to null initially
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) {
      console.error('No file selected');
      return;
    }

    // Store the file for uploading
    this.selectedFile = file;
    console.log('Selected File:', this.selectedFile);

    // Set the file object in FormControl (use `file`, not Base64)
    this.UploadForm.get('image')?.setValue(file);

    // Optional: Read file as Base64 for preview
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      console.log('Base64 Encoded Image:', e.target?.result); // Preview image
      this.selectedFile = e.target?.result as string; // Store Base64 for preview
    };
    reader.readAsDataURL(file);
  }


  uploadProduct() {
    this.submitted = true;
    if (this.UploadForm.invalid) {
      return;
    }
    this.UploadForm.value.image = this.selectedFile
      console.log(this.UploadForm.value)
    this.service.CreateProducts(this.UploadForm.value).subscribe(
      (response) => {
        console.log('Product uploaded successfully:', response);
        this.success = 'Upload successful';
        this.UploadForm.reset();
      },
      (error) => {
        console.error('Upload failed:', error);
      }
    );
  }

}

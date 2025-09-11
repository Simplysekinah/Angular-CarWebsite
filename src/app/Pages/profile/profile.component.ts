import { Component } from '@angular/core';
import { AuthService } from '../../Service/Auth/auth.service';
import { UserInterface } from '../../Interface/auth';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  _id: any = localStorage.getItem('_id')
  user: UserInterface | any
  updateForm!: FormGroup;
  constructor(private userservice: AuthService, private FB: FormBuilder,) {

  }
  ngOnInit() {
    // console.log(this._id)
    if (this._id.length > 0) {
      this.userservice.getUser(this._id).subscribe((response) => {
        this.user = response.user
        console.log(this.user);
      })
    } else {
      console.log("no id found");
    }

    this.updateForm = this.FB.group({
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      picture: [''],
      _id: this._id
    });
  }
  uploadImage(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result as string;

        // Update the form control properly
        this.updateForm.patchValue({ picture: base64Image });

        // Optional: update preview immediately
        this.user.profilePic = base64Image;

        console.log('Base64 image:', base64Image);
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      reader.readAsDataURL(file); // ✅ Use this for images
    }
  }
  updateProfile() {
    console.log(this.updateForm.value);
    this.userservice.updateUser(this.updateForm.value).subscribe((response) => {
      console.log(response);
    })
  }
}

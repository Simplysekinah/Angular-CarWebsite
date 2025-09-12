import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AdminAuthService } from '../../../Service/Admin/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, NgClass, CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  showLogin = false;

  SignupForm!: FormGroup;
  LoginForm!: FormGroup;
  submitted = false;
  success = '';
  adminToken:string = localStorage.getItem('adminToken') || '';
  constructor(private service: AdminAuthService, private FB: FormBuilder, private router:Router) {
    console.log('Saved Token:', this.adminToken);
   }

  ngOnInit() {
    this.showLogin = false;

    this.SignupForm = this.FB.group({
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.LoginForm = this.FB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.onDashboard();

  }

  onSubmit() {
    console.log('first')
    console.log(this.SignupForm.value);
    this.submitted = true;

    if (this.SignupForm.invalid) {
      return;
    }
    this.service.Signup(this.SignupForm.value).subscribe((response)=>{
      console.log(response)
      this.success = 'Signup successful';
        this.toggleForm(); // Call toggleForm after successful signup
    },
    (error) => {
      console.error('Signup failed:', error)});
  }

  onLogin() {
    console.log('first')
    console.log(this.LoginForm.value);
    this.submitted = true;
    // console.log(this.service.Signup(this.SignupForm.value));

    if (this.LoginForm.invalid) {
      return;
    }
    this.service.Signin(this.LoginForm.value).subscribe((response)=>{
      console.log(response)
      this.success = 'Signin successful';
      this.router.navigate(['/admin/Dashboard'])
    },
    (error) => {
      console.error('Signup failed:', error)});
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  backToLogin() {
    this.showLogin = true;
  }

  onDashboard() {
    let adminToken = localStorage.getItem('adminToken');
    if(adminToken){
      this.service.getUserData().subscribe((response)=>{
        console.log(response)
        this.router.navigate(['/admin/Dashboard'])
      },
      (error) => {
        console.error('Failed:', error)
        this.success = 'Session Expired';
        this.router.navigate(['/admin/signup'])
      });
    }else{
      this.router.navigate(['/admin/signup'])
    }
  }
}

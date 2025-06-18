import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../../Service/Auth/auth.service';
import { main } from '../../Utils/api';
import { api } from '../../Api/api';
import { Router } from '@angular/router';
// import { on } from 'events';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgClass, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showLogin = false;
  showForgotPassword = false;
  showOTP = false;
  showResetPassword = false;

  SignupForm!: FormGroup;
  LoginForm!: FormGroup;
  ForgetPasswordForm!: FormGroup;
  OTPForm!: FormGroup;
  ResetPasswordForm!: FormGroup;
  submitted = false;
  success = '';
  token:string = localStorage.getItem('token') || '';
  constructor(private service: AuthService, private FB:FormBuilder, private router:Router) {
    console.log('Saved Token:', this.token);
    // this.onSubmit();
   }

  ngOnInit() {
    // Ensure only the signup form is shown initially
    this.showLogin = false;
    this.showForgotPassword = false;
    this.showOTP = false;
    this.showResetPassword = false;

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

    this.ForgetPasswordForm = this.FB.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.OTPForm = this.FB.group({
      otp1: ['', [Validators.required, Validators.minLength(1)]],
      otp2: ['', [Validators.required, Validators.minLength(1)]],
      otp3: ['', [Validators.required, Validators.minLength(1)]],
      otp4: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.ResetPasswordForm = this.FB.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      reset: ['', [Validators.required, Validators.minLength(8)]],
    });
    // this.onDashboard();

  }

  onSubmit() {
    console.log('first')
    console.log(this.SignupForm.value);
    this.submitted = true;
    // console.log(this.service.Signup(this.SignupForm.value));

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
    // console.log('first')
    // console.log(this.LoginForm.value);
    this.submitted = true;
    // console.log(this.service.Signup(this.SignupForm.value));

    if (this.LoginForm.invalid) {
      return;
    }
    this.service.Signin(this.LoginForm.value).subscribe((response)=>{
      console.log(response)
      console.log(response.user._id)
      localStorage.setItem('_id',response.user._id)
      this.success = 'Signin successful';
      this.router.navigate(['/dashboard'])
    },
    (error) => {
      console.error('Signup failed:', error)});
  }

  onForgotPassword() {
    console.log('first')
    console.log(this.ForgetPasswordForm.value);
    this.submitted = true;

    if (this.ForgetPasswordForm.invalid) {
      return;
    }
    this.service.ForgetPassword(this.ForgetPasswordForm.value).subscribe((response)=>{
      console.log(response)
      this.success = 'Email Received';
      localStorage.setItem('email', this.ForgetPasswordForm.value.email);
      this.showOTPForm();
    },
    (error) => {
      console.error('Email failed:', error)});
  }

  onOTPVerification() {
    console.log('first')
    console.log(this.OTPForm.value);
    this.submitted = true;

    if (this.OTPForm.invalid) {
      return;
    }
    const otp = this.OTPForm.value.otp1 + this.OTPForm.value.otp2 + this.OTPForm.value.otp3 + this.OTPForm.value.otp4;
    this.OTPForm.value.otp = otp;
    console.log(otp)
    console.log(this.OTPForm.value.otp)
    // this.OTPForm.value.email = this.ForgetPasswordForm.value.email;
    let email =localStorage.getItem('email');
    let e = {email: email, otp: otp};
    console.log(e)
    this.service.ResetPassword(e).subscribe((response)=>{
      console.log(response)
      this.success = 'Email Received';
      localStorage.setItem('otp', e.otp);
      this.showResetPasswordForm();
    },
    (error) => {
      console.error('Email failed:', error)});
  }

  onResetPassword() {
    console.log('first')
    console.log(this.OTPForm.value);
    this.submitted = true;

    let email =localStorage.getItem('email');
    let otp =localStorage.getItem('otp');
    if (this.ResetPasswordForm.invalid) {
      return;
    }else if(this.ResetPasswordForm.value.password != this.ResetPasswordForm.value.reset){
      this.success = 'Password does not match';
      return;
    }
    let e = {email: email, otp: otp, password: this.ResetPasswordForm.value.password};
    console.log(e)
    this.service.VerifyPassword(e).subscribe((response)=>{
      console.log(response)
      this.success = 'Password Reset Successful';
      this.backToLogin();
    },
    (error) => {
      console.error('Password Reset Failed:', error)});
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
    this.showForgotPassword = false;
    this.showOTP = false;
    this.showResetPassword = false;
  }

  showForgotPasswordForm() {
    this.showForgotPassword = true;
    this.showLogin = false;
    this.showOTP = false;
    this.showResetPassword = false;
  }

  showOTPForm() {
    this.showOTP = true;
    this.showForgotPassword = false;
    this.showLogin = false;
    this.showResetPassword = false;
  }

  showResetPasswordForm() {
    this.showResetPassword = true;
    this.showOTP = false;
    this.showForgotPassword = false;
    this.showLogin = false;
  }

  backToLogin() {
    this.showLogin = true;
    this.showForgotPassword = false;
    this.showOTP = false;
    this.showResetPassword = false;
  }

  onDashboard() {
    let token = localStorage.getItem('token');
    if(token){
      this.service.getUserData().subscribe((response)=>{
        console.log(response);
        this.router.navigate(['/dashboard'])
      },
      (error) => {
        console.error('Failed:', error)
        this.success = 'Session Expired';
        this.router.navigate(['/signup'])
      });
    }else{
      this.router.navigate(['/signup'])
    }
  }
}

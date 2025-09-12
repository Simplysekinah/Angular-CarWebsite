import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.css'
})
export class DashboardsComponent {
  constructor(private router:Router) { }
  Upload(){
    this.router.navigate(['/Upload'])
  }
}

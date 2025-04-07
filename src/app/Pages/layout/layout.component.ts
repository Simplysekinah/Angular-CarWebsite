import { Component } from '@angular/core';
import { ProductService } from '../../Service/ProductService/product.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-layout',
  imports: [NgIcon],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor( private service:ProductService) {}

  ngOnInit() {
    this.service.GetProducts().subscribe((response) => {
      console.log('Products:', response);
    });
  }
}

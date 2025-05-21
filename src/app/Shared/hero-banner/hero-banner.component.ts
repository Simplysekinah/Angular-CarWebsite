import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hero-banner',
  imports: [CommonModule],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.css'
})
export class HeroBannerComponent {
  @Input() imageUrl: string = '';
  @Input() altText: string = 'Hero image';
  @Input() backgroundImage: string = '';
  @Output() rentalClick = new EventEmitter<void>();
// backgroundImage: any;
}

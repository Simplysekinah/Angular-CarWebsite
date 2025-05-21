import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-car-card',
  imports: [CommonModule],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css'
})
export class CarCardComponent {
  @Input() car: any;
   @Output() carSelected = new EventEmitter<string>(); // Define event emitter

  selectCar() {
    this.carSelected.emit(this.car._id); // Emit car ID when clicked
  }


}

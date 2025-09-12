import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {bootstrapEvStationFill,bootstrapPeopleFill,bootstrapHeart,bootstrapHeartFill} from '@ng-icons/bootstrap-icons'
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-car-card',
  imports: [CommonModule,NgIcon],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
  viewProviders:[provideIcons({bootstrapEvStationFill,bootstrapPeopleFill,bootstrapHeart,bootstrapHeartFill})]
})
export class CarCardComponent {
  @Input() isfavourites!: boolean
  @Input() car: any;
   @Output() carSelected = new EventEmitter<string>(); // Define event emitter
   @Output() favourites = new EventEmitter<string>(); // Define event emitter

  selectCar() {
    this.carSelected.emit(this.car._id); // Emit car ID when clicked
  }
  favourite(event:Event){
    event.stopPropagation()
    this.favourites.emit(this.car._id);
  }


}

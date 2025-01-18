import { Component, input } from '@angular/core';

@Component({
  selector: 'app-famous-trip',
  standalone: true,
  imports: [],
  templateUrl: './famous-trip.component.html',
  styleUrl: './famous-trip.component.scss',
})
export class FamousTripComponent {
  tripType = input<string>();
}

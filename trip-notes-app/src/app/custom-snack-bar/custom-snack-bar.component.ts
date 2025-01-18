import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { ToastColorDirective } from '../toast-color.directive';

@Component({
  selector: 'app-custom-snack-bar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    ToastColorDirective
  ],
  templateUrl: './custom-snack-bar.component.html',
  styleUrl: './custom-snack-bar.component.scss',
})
export class CustomSnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any){}
}

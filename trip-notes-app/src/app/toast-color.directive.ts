import {
  Directive,
  ElementRef,
  input,
  OnInit,
  Renderer2
} from '@angular/core';
import { ToastType } from './enums';

@Directive({
  selector: '[appToastColor]',
  standalone: true,
})
export class ToastColorDirective implements OnInit {
  toastType = input<ToastType>();

  private changeTextColor() {
    switch (this.toastType()) {
      case ToastType.DELETE:
        this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
        break;
      case ToastType.ADD:
        this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
        break;
      case ToastType.EDIT:
        this.renderer.setStyle(this.el.nativeElement, 'color', 'yellow');
        break;
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.changeTextColor();
  }
}

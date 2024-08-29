import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appThousandSeparator]',
  standalone: true,
})
export class ThousandSeparatorDirective implements OnInit {
  @Input()
  actualValue!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setProperty(
      this.el.nativeElement,
      'value',
      this.formatNumber(this.actualValue)
    );
  }

  @HostListener('input', ['$event.target.value']) onInputChange(value: any) {
    const numericValue = parseInt(value.replace(/\s+/g, ''), 10);
    this.actualValue = isNaN(numericValue) ? 0 : numericValue;
    this.renderer.setProperty(
      this.el.nativeElement,
      'value',
      this.formatNumber(this.actualValue)
    );
  }

  formatNumber(value: number): string {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}

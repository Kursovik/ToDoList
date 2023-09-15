import {
  Component,
  ContentChild,
  Input, OnChanges,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-carousel[values]',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent<T> implements OnChanges {
  @Input() public values: T[];
  @Input()
  public numOfVisibleValues: number = 2;

  @ContentChild('body', { static: true })
  public body: TemplateRef<any>;
  public valuesView: T[] ;
  private levelView: number = 0;
 public ngOnChanges(): void {
   this.initialValuesView();
  }
  private initialValuesView(): void {
    this.valuesView = [];

    for (let i = this.levelView; i < this.levelView + this.numOfVisibleValues; i++) {
      this.values[i] && this.valuesView.push(this.values[i]);
    }
  }
  public prevValues() {
    if (this.levelView < this.numOfVisibleValues) return;
    this.levelView -= this.numOfVisibleValues;

    this.initialValuesView();
  }
  public nextValues() {

    this.levelView += this.numOfVisibleValues;
    if (this.levelView > this.values.length - 1) {
      this.levelView -= this.numOfVisibleValues;
      return;
    }

    this.initialValuesView();
  }


}

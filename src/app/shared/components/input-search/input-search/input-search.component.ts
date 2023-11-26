import { Component, Input, OnInit } from '@angular/core';
import { StateSliceService } from '../../../services/state-slice.service';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-input-search[searchLabel]',
  template: `<input
    [formControl]="searchFormControl"
    pInputText
    placeholder="Поиск..."
  />`,
  styles: [
    `
      input {
        width: 100%;
        background-color: transparent;
        color: #d9d4d4;
        font-size: 17px;
        border: none;
        box-sizing: border-box;
      }

      input:hover {
        background-color: rgba(169, 169, 169, 0.35);
      }
    `,
  ],
})
export class InputSearchComponent<T extends { [key: string]: string }>
  implements OnInit
{
  @Input()
  public searchLabel: string;
  private copyValue: T[];
  public searchFormControl = new FormControl('');
  constructor(private stateSliceService: StateSliceService<T>) {}

  public ngOnInit(): void {
    this.copyValue =  this.stateSliceService.staticState
    this.searchFormControl.valueChanges.pipe(
      tap((value) => {
        value
          ? this.stateSliceService.setState(
              this.copyValue.filter((data) => {
                return data[this.searchLabel]
                  .toLowerCase()
                  .includes(value.toLowerCase());
              }),
            )
          : this.stateSliceService.setState(this.copyValue);
      }),
    ).subscribe();
  }
}

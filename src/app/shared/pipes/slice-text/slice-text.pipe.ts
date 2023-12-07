import { Pipe, PipeTransform } from '@angular/core';
import { cloneDeep } from '../../utils/cloneDeep';

@Pipe({
  name: 'sliceText',
})
export class SliceTextPipe<T> implements PipeTransform {
  transform(value: T, sliceValue: number) {
    if(!value) return ;
    const copyValue: string = cloneDeep(value);
    return (
      copyValue.slice(0, sliceValue) +
      (copyValue.length >= sliceValue ? '...' : '')
    );
  }
}

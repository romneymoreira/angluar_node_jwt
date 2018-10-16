import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'px'
})
export class PxPipe implements PipeTransform {

  transform(value: string | number, ...args: any[]): any {
    if (value) {
      return Number(value) >= 0 ? `${value}px` : value;
    }
  }
}

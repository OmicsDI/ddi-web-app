/**
 * Created by user on 4/11/2017.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDateString'
})
export class ToDateStringPipe implements PipeTransform {
  transform(value: string, args: string[]): string {
    return `${value.substr(0,4)}-${value.substr(4,2)}-${value.substr(6,2)}`;
  }
}


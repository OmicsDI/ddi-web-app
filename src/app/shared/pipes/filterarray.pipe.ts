import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterarray',
    pure: false
})
export class FilterArrayPipe implements PipeTransform {
    transform(items: String[], filter: String): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match will be
        // filtered out; others will be kept
        return items.filter(item => item.toLowerCase() !== filter.toLowerCase());
    }
}
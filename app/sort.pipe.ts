import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})

export class SortUsersPipe implements PipeTransform {
    transform(array: Array<any>) {
        return array.sort((a, b) => {
            if (a.surname > b.surname) {
                return 1;
            }
            if (a.surname < b.surname) {
                return -1;
            }
            
            return 0;
        });    
    }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'checkFilter'
})

export class CheckPipe implements PipeTransform {
    transform(items: any[]) { 
        //console.log(123);
        return items;
   }
}
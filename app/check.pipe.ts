import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'checkFilter'
})

export class CheckPipe implements PipeTransform {
    transform(items: any[], check: any) { 
        console.log(check);
        return items;
   }
}
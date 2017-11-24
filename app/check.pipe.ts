import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'checkFilter'
})

export class CheckPipe implements PipeTransform {
    transform(itemsData: any[], itemsPositions: any[]) { 
        if(!itemsData) {
            return [];
        }

        return itemsData.filter(it => {
            for(let i = 0; i < itemsPositions.length; i++) {
                if(itemsPositions[i].selected && (itemsPositions[i].position == it.position)) {
                    return true;
                }
            }
        });
   }
}
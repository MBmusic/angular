import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], searchUser: string) { 
        if(!items) {
            return [];
        }

        if(!searchUser) { 
            return items; 
        } 

        searchUser = searchUser.toLowerCase();
        
        return items.filter( it => {
            return it.surname.toLowerCase().includes(searchUser) 
                || it.name.toLowerCase().includes(searchUser)
                || it.patronymic.toLowerCase().includes(searchUser);
        });
   }
}
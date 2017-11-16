import { Component } from '@angular/core';
import { dataUsers } from "./data";
import { positionUsers } from "./positions";
import { Pipe } from "@angular/core";

declare var UIkit:any;

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent {
    dataUsers: Array<any> = dataUsers;
    positionInput: string = '';
    fieldError: boolean = true;
    fieldErrorMessage:string = "";
    //fieldErrorHasPosition:string = "Такая должность уже добавлена";

    log(val) { 
        console.log(val); 
    }

    createPosition() {
        if(this.positionInput == "") {
            this.fieldErrorMessage = "Заполните поле";
            return this.fieldError = false;       
        }

        positionUsers.forEach(element => {
            
            if(this.positionInput == element.position) {
                console.log(this.positionInput);
                console.log(element.position);
                this.fieldErrorMessage = "Такая должность уже добавлена";
                return this.fieldError = false;
            }
        });

        let pos = {
            position: this.positionInput
        };

        positionUsers.push(pos);

        //console.log(positionUsers);

        this.positionInput = '';
        UIkit.modal.alert("Должность добавлена!");

        return this.fieldError = true;
    }
    
}


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
    positionUsers: Array<any> = positionUsers;
    positionInput: string = '';
    fieldError: boolean = true;
    fieldErrorMessage:string = "";

    log(val) { 
        console.log(val); 
    }

    createPosition() {      
        if(this.positionInput == "") {
            this.fieldErrorMessage = "Заполните поле";
            return this.fieldError = false;       
        }

        let LowerThisPosition = this.positionInput.toLowerCase();

        for(let i = 0; i < positionUsers.length; i++) {
            if(LowerThisPosition == positionUsers[i].position.toLowerCase()) {
                this.fieldErrorMessage = "Такая должность уже добавлена";
                return this.fieldError = false;
            }     
        }

        let pos = {
            position: this.positionInput
        };

        positionUsers.push(pos);

        this.positionInput = '';
        UIkit.modal.alert("Должность добавлена!");

        return this.fieldError = true;
    }

    addClassPositions() {
        return (positionUsers.length > 0) ? "" : "no-positions";
    }

    deletePosition(position: any) {
        UIkit.modal.confirm("Are you sure?", function(){
            // will be executed on confirm.
            console.log(123);
        });

        //console.log(position);
    }
    
}


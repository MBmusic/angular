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
    fieldErrorMessage: string = "";
    titleAddPosition: string = "";
    titleBtnAddPosition: string = "";
    addChangePosition: string = "";
    positionNum: number;

    log(i) {
        console.log(i);
    }

    changeCheckboxes() {
        this.positionUsers = this.positionUsers.slice();
    } 
    
    selectAllCheckboxes(ev) {
        this.positionUsers.forEach(x => x.selected = ev.target.checked)
        this.changeCheckboxes();
    }
      
    itemCheck() {
        return this.positionUsers.every(_ => _.selected);
    }

    positionTitlesPopup(mainTitle: string, btnTitle: string, eventUser: string) {
        this.fieldError = true;
        this.titleAddPosition = mainTitle;
        this.titleBtnAddPosition = btnTitle;
        this.addChangePosition = eventUser;
    }

    addPositionPopup() {
        this.positionTitlesPopup("Добавить должность", "Добавить", "добавление");
    }

    changePositionPopup(position: string, num: number) {
        this.positionNum = num;
        this.positionInput = position;
        this.positionTitlesPopup("Изменить должность", "Изменить", "изменение");
    }

    createChangePosition() {  
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

        if(this.addChangePosition == "добавление") {
            let pos = {
                position: this.positionInput,
                selected: true
            };

            positionUsers.push(pos);

            this.positionInput = '';
            UIkit.modal.alert("Должность добавлена!");

            return this.fieldError = true;

        } else if(this.addChangePosition == "изменение") {
            positionUsers[this.positionNum].position = this.positionInput;
            return this.fieldError = true;
        }
    }

    addClassPositions() {
        return (positionUsers.length > 0) ? "" : "no-positions";
    }

    deletePosition(position: any) {       
        UIkit.modal.confirm("Вы уверены что хотите удалить должность?", () => {
            let index = this.positionUsers.indexOf(position);
    
            if(index > -1) {
                this.positionUsers.splice(index, 1);
            }
        });
    }

    deleteAllPosition() {
        UIkit.modal.confirm("Вы уверены что хотите удалить все должности?", () => {
            return this.positionUsers.length = 0;
        });
    }
    
}


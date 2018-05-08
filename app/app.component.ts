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
    positionInput: string = "";
    positionReserveCopy: string = "";
    fieldError: boolean = true;
    fieldErrorMessage: string = "";
    titleAddPosition: string = "";
    titleBtnAddPosition: string = "";
    addChangePosition: string = "";
    addChangeUser: string = "";
    positionNum: number;

    /* Users values */

    titleUser: string = "";
    titleBtnAddUser: string = "";

    nameUserInput: string = "";
    surnameUserInput: string = "";
    patronymicUserInput: string = "";
    positionUserSelect: string = "Выберите должность";
    emailUserInput: string = "";
    skypeUserInput: string = "";

    userSelectId: number;

    /* User errors */

    fieldErrorName: string = "";
    fieldErrorSurname: string = "";
    fieldErrorPatronymic: string = "";
    fieldErrorPosition: string = "";
    fieldErrorEmail: string = "";
    fieldErrorSkype: string = "";

    fieldErrorBlockName: boolean = true;
    fieldErrorBlockSurname: boolean = true;
    fieldErrorBlockPatronymic: boolean = true;
    fieldErrorBlockPosition: boolean = true;
    fieldErrorBlockEmail: boolean = true;
    fieldErrorBlockSkype: boolean = true;

    /* ... */

    log(i) {
        console.log(i);
    }

    changeCheckboxes() {
        this.positionUsers = this.positionUsers.slice();
    } 

    changeData() {
        this.dataUsers = this.dataUsers.slice();
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
        this.positionInput = "";
        this.positionTitlesPopup("Добавить должность", "Добавить", "добавление");
    }

    changePositionPopup(position: string, num: number) {
        this.positionNum = num;
        this.positionInput = position;
        this.positionReserveCopy = position;
        this.positionTitlesPopup("Изменить должность", "Изменить", "изменение");
    }

    createChangePosition() {  
        if(this.positionInput == "") {
            this.fieldErrorMessage = "Заполните поле";
            return this.fieldError = false;       
        }

        let LowerThisPosition = this.positionInput.toLowerCase();
        
        for(let i = 0; i < this.positionUsers.length; i++) {
            if(LowerThisPosition == this.positionUsers[i].position.toLowerCase()) {
                this.fieldErrorMessage = "Такая должность уже добавлена";
                return this.fieldError = false;
            }     
        }

        if(this.addChangePosition == "добавление") {
            let pos = {
                position: this.positionInput,
                selected: true
            };

            this.positionUsers.push(pos);

            this.positionInput = '';
            UIkit.modal.alert("Должность добавлена!");

            return this.fieldError = true;

        } else if(this.addChangePosition == "изменение") {
            this.positionUsers[this.positionNum].position = this.positionInput;

            for(let i = 0; i < dataUsers.length; i++) {
                if(dataUsers[i].position == this.positionReserveCopy) {
                    dataUsers[i].position = this.positionInput;
                }
            }

            UIkit.modal("#popup-positions").hide();
            return this.fieldError = true;
        }
    }

    addClassPositions() {
        return (this.positionUsers.length > 0) ? "" : "no-positions";
    }

    deletePosition(position: any) {       
        UIkit.modal.confirm("Вы уверены что хотите удалить должность?", () => {
            let index = this.positionUsers.indexOf(position);
    
            if(index > -1) {
                this.positionUsers.splice(index, 1);
            }
            
            for(let i = 0; i < dataUsers.length; i++) {
                if(dataUsers[i].position == position.position) {
                    dataUsers.splice(i, 1);
                } 
            }
        });
    }

    deleteAllPosition() {
        UIkit.modal.confirm("Вы уверены что хотите удалить все должности?", () => {
            this.positionUsers.length = 0;
            this.dataUsers.length = 0;
        });
    }


    /* */
    
    errorsUsersTrue() {
        this.fieldErrorBlockName = true; 
        this.fieldErrorBlockSurname = true; 
        this.fieldErrorBlockPatronymic = true; 
        this.fieldErrorBlockPosition = true; 
        this.fieldErrorBlockEmail = true; 
        this.fieldErrorBlockSkype = true;
    }

    userTitlesPopup(title: string, btnText: string, eventUser) {
        this.errorsUsersTrue();
        this.titleUser = title;
        this.titleBtnAddUser = btnText;
        this.addChangeUser = eventUser;
    }

    addUserPopup() {
        this.errorsUsersTrue();

        this.nameUserInput = '';
        this.surnameUserInput = '';
        this.patronymicUserInput = '';

        if(this.positionUsers.length == 1) {
            this.positionUserSelect = this.positionUsers[0].position;
        } else {
            this.positionUserSelect = 'Выберите должность';
        }
        
        this.emailUserInput = '';
        this.skypeUserInput = '';
        this.userTitlesPopup("Добавить пользователя", "Добавить", "добавление");
    }

    createChangeUser() {
        if(this.nameUserInput == "") {  
            this.fieldErrorName = "Заполните поле";
            return this.fieldErrorBlockName = false;
        } else {
            this.fieldErrorName = "";
            this.fieldErrorBlockName = true;
        }

        if(this.surnameUserInput == "") {  
            this.fieldErrorSurname = "Заполните поле";
            return this.fieldErrorBlockSurname = false;
        } else {
            this.fieldErrorSurname = "";
            this.fieldErrorBlockSurname = true;
        }

        if(this.patronymicUserInput == "") {  
            this.fieldErrorPatronymic = "Заполните поле";
            return this.fieldErrorBlockPatronymic = false;
        } else {
            this.fieldErrorPatronymic = "";
            this.fieldErrorBlockPatronymic = true;
        }

        if(this.positionUserSelect == "Выберите должность") {  
            this.fieldErrorPosition = "Выберите должность";
            return this.fieldErrorBlockPosition = false;
        } else {
            this.fieldErrorPosition = "";
            this.fieldErrorBlockPosition = true;
        }

        if(this.emailUserInput == "") {  
            this.fieldErrorEmail = "Заполните поле";
            return this.fieldErrorBlockEmail = false;
        } else {
            this.fieldErrorEmail = "";
            this.fieldErrorBlockEmail = true;
        }

        if(this.skypeUserInput == "") {  
            this.fieldErrorSkype = "Заполните поле";
            return this.fieldErrorBlockSkype = false;
        } else {
            this.fieldErrorSkype = "";
            this.fieldErrorBlockSkype = true;
        }

        if(this.addChangeUser == "добавление") {
            for(let i = 0; i < this.dataUsers.length; i++) {
                if(this.dataUsers[i].email == this.emailUserInput) {
                    UIkit.modal.alert("ОШИБКА<br><br>Пользователь с такой почтой уже есть");
                    return false;
                } else if(this.dataUsers[i].skype == this.skypeUserInput) {
                    UIkit.modal.alert("ОШИБКА<br><br>Пользователь с таким скайпом уже есть");
                    return false;
                }
            }

            let user = {
                avatarUrl: "/assets/img/user.jpg",
                name: this.nameUserInput,
                surname: this.surnameUserInput,
                patronymic: this.patronymicUserInput,
                position: this.positionUserSelect,
                email: this.emailUserInput,
                skype: this.skypeUserInput
            };

            dataUsers.push(user);

            this.nameUserInput = '';
            this.surnameUserInput = '';
            this.patronymicUserInput = '';
            this.positionUserSelect = 'Выберите должность';
            this.emailUserInput = '';
            this.skypeUserInput = '';
            UIkit.modal.alert("Пользователь добавлен!");

            return this.errorsUsersTrue(); 
        } else if(this.addChangeUser == "изменение") {

            this.dataUsers[this.userSelectId].name = this.nameUserInput;
            this.dataUsers[this.userSelectId].surname = this.surnameUserInput;
            this.dataUsers[this.userSelectId].patronymic = this.patronymicUserInput;
            this.dataUsers[this.userSelectId].position = this.positionUserSelect;
            this.dataUsers[this.userSelectId].email = this.emailUserInput;
            this.dataUsers[this.userSelectId].skype = this.skypeUserInput;

            UIkit.modal("#popup-users").hide();
            return this.errorsUsersTrue(); 
        }
    }

    deleteUser(user: any) {
        UIkit.modal.confirm("Вы уверены что хотите удалить сотрудника?", () => {
            let index = this.dataUsers.indexOf(user);
            this.dataUsers.splice(index, 1);
        });
    }

    changeUserInformation(userIndex: any) {
        this.nameUserInput = this.dataUsers[userIndex].name;
        this.surnameUserInput = this.dataUsers[userIndex].surname;
        this.patronymicUserInput = this.dataUsers[userIndex].patronymic;
        this.positionUserSelect = this.dataUsers[userIndex].position;
        this.emailUserInput = this.dataUsers[userIndex].email;
        this.skypeUserInput = this.dataUsers[userIndex].skype;
        this.userSelectId = userIndex;
        this.userTitlesPopup("Редактирование информации", "изменить", "изменение");
    }


}


import { Component, OnInit } from '@angular/core';
import { Pipe } from "@angular/core";
import { TodoService } from './shared/todo.service';

declare var UIkit:any;

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ TodoService ]
})

export class AppComponent implements OnInit {
    dataUsers: any[];
    positionUsers: any[];

    positionInput: string = "";
    positionReserveCopy: string = "";
    fieldError: boolean = true;
    fieldErrorMessage: string = "";
    titleAddPosition: string = "";
    titleBtnAddPosition: string = "";
    addChangePosition: string = "";
    addChangeUser: string = "";
    positionNum: number;
    positionKey: string;

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
    userKey: string;

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

    constructor(private toDoService: TodoService) {  }

    ngOnInit() {
        this.toDoService.getPositionsList().snapshotChanges()
        .subscribe(item => {
            this.positionUsers = [];
            item.forEach(el => {
                let x = el.payload.toJSON();
                x["$key"] = el.key;
                this.positionUsers.push(x);
            })
        });

        this.toDoService.getUsersList().snapshotChanges()
        .subscribe(item => {
            this.dataUsers = [];
            item.forEach(el => {
                let x = el.payload.toJSON();
                x["$key"] = el.key;
                this.dataUsers.push(x);
            })
        });
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

    changePositionPopup(position: string, num: number, key: any) {
        //console.log(key);
        this.positionNum = num;
        this.positionKey = key;
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
            this.toDoService.addPosition(this.positionInput);
            this.positionInput = '';
            UIkit.modal.alert("Должность добавлена!");
            UIkit.modal("#popup-positions").hide();

            return this.fieldError = true;
        } else if(this.addChangePosition == "изменение") {
            this.toDoService.changePosition(this.positionKey, this.positionInput);
            UIkit.modal("#popup-positions").hide();

            return this.fieldError = true;
        }
    }

    addClassPositions() {
        return (this.positionUsers.length > 0) ? "" : "no-positions";
    }

    deletePosition(position: any) {      
        UIkit.modal.confirm("Вы уверены что хотите удалить должность?", () => {
            this.toDoService.deletePosition(position);
            
            /*for(let i = 0; i < dataUsers.length; i++) {
                if(dataUsers[i].position == position.position) {
                    dataUsers.splice(i, 1);
                } 
            }*/
        });
    }

    deleteAllPosition() {
        UIkit.modal.confirm("Вы уверены что хотите удалить все должности?", () => {
            this.toDoService.deleteAllPositions();
            this.toDoService.deleteAllUsers();
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

    changeUserInformation(userIndex: any, key: string) {
        this.nameUserInput = this.dataUsers[userIndex].name;
        this.surnameUserInput = this.dataUsers[userIndex].surname;
        this.patronymicUserInput = this.dataUsers[userIndex].patronymic;
        this.positionUserSelect = this.dataUsers[userIndex].position;
        this.emailUserInput = this.dataUsers[userIndex].email;
        this.skypeUserInput = this.dataUsers[userIndex].skype;
        this.userSelectId = userIndex;
        this.userKey = key;

        this.userTitlesPopup("Редактирование информации", "изменить", "изменение");
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

        for(let i = 0; i < this.dataUsers.length; i++) {
            if(this.dataUsers[i].email == this.emailUserInput) {
                this.fieldErrorBlockEmail = false;
                this.fieldErrorEmail = "Пользователь с такой почтой уже есть";
                return false;
            } else if(this.dataUsers[i].skype == this.skypeUserInput) {
                this.fieldErrorBlockSkype = false;
                this.fieldErrorSkype = "Пользователь с таким скайпом уже есть";
                return false;
            }
        }

        if(this.addChangeUser == "добавление") {
            this.toDoService.addUser(this.nameUserInput, this.surnameUserInput, this.patronymicUserInput, this.positionUserSelect, this.emailUserInput, this.skypeUserInput);

            this.nameUserInput = '';
            this.surnameUserInput = '';
            this.patronymicUserInput = '';
            this.positionUserSelect = 'Выберите должность';
            this.emailUserInput = '';
            this.skypeUserInput = '';
            UIkit.modal.alert("Пользователь добавлен!");
            UIkit.modal("#popup-users").hide();

            return this.errorsUsersTrue(); 
        } else if(this.addChangeUser == "изменение") {

            this.toDoService.changeUser(this.userKey, this.nameUserInput, this.surnameUserInput, this.patronymicUserInput, this.positionUserSelect, this.emailUserInput, this.skypeUserInput);

            UIkit.modal("#popup-users").hide();
            return this.errorsUsersTrue(); 
        }
    }

    deleteUser(user: any) {
        UIkit.modal.confirm("Вы уверены что хотите удалить сотрудника?", () => {
            this.toDoService.deleteUser(user);
        });
    }
}


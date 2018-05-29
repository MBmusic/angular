import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class TodoService {
    positionsList: AngularFireList<any>;
    usersList: AngularFireList<any>;

    constructor(private firebasedb: AngularFireDatabase) { }

    getPositionsList() {
        this.positionsList = this.firebasedb.list("positionUsers");
        return this.positionsList;
    }

    getUsersList() {
        this.usersList = this.firebasedb.list("dataUsers");
        return this.usersList;
    }

    addPosition(positionName: any) {
        this.positionsList.push({
            position: positionName,
            selected: true
        });
    }

    changePosition(key: string, text: string) {
        this.positionsList.update(key, { position: text });  
    }

    deletePosition(key: string) {
        this.positionsList.remove(key);
    }

    deleteAllPositions() {
        this.positionsList.remove();
    }

    addUser(nameUser: any, surnameUser: any, patronymicUser: any, positionUser: any, emailUser: any, skypeUser: any) {
        this.usersList.push({
            avatarUrl: "/assets/img/user.jpg",
            name: nameUser,
            surname: surnameUser,
            patronymic: patronymicUser,
            position: positionUser,
            email: emailUser,
            skype: skypeUser
        });
    }

    changeUser(key: string, nameUser: any, surnameUser: any, patronymicUser: any, positionUser: any, emailUser: any, skypeUser: any) {
        this.usersList.update(key, {
            avatarUrl: "/assets/img/user.jpg",
            name: nameUser,
            surname: surnameUser,
            patronymic: patronymicUser,
            position: positionUser,
            email: emailUser,
            skype: skypeUser
        });
    }

    deleteUser(key: string) {
        this.usersList.remove(key);
    }

    deleteAllUsers() {
        this.usersList.remove();
    }

}

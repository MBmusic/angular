import { Component } from '@angular/core';
import { dataUsers } from "./data";
import { positionUsers } from "./positions";
import { Pipe } from "@angular/core";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent {
    dataUsers = dataUsers;

    createPosition(event: Event, title: string) {
        event.preventDefault();

        let pos = {
            position: title
        };

        positionUsers.push(pos);

        console.log(positionUsers);
    }
}


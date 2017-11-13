import { Component } from '@angular/core';
import { dataUsers } from "./data";
import { Pipe } from "@angular/core";


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent {
    dataUsers = dataUsers;
}


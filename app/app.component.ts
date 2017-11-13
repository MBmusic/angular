import { Component } from '@angular/core';
import { dataUsers } from "./data";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    //dataUsers = [];
    dataUsers = dataUsers;
    
    /*constructor() {
        this.dataUsers = [];
    }*/
}

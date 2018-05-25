import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { enableProdMode } from '@angular/core';
import { SortUsersPipe } from './sort.pipe';
import { FilterPipe } from './search.pipe';
import { CheckPipe } from './check.pipe';

/* Firebase */
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

enableProdMode();

@NgModule({
    declarations: [ 
        AppComponent, 
        SortUsersPipe, 
        FilterPipe, 
        CheckPipe 
    ],
    imports: [ 
        BrowserModule, 
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule  
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }

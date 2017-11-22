import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { enableProdMode } from '@angular/core';
import { SortUsersPipe } from './sort.pipe';
import { FilterPipe } from './search.pipe';
import { CheckPipe } from './check.pipe';

enableProdMode();

@NgModule({
    declarations: [ AppComponent, SortUsersPipe, FilterPipe, CheckPipe ],
    imports: [ BrowserModule, FormsModule ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }

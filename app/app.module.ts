import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { enableProdMode } from '@angular/core';
import { FactorialPipe} from './sort.pipe';

enableProdMode();

@NgModule({
    declarations: [ AppComponent,FactorialPipe ],
    imports: [ BrowserModule ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }

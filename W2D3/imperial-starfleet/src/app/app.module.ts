import { InternalDefensesModule } from './internal-defenses/internal-defenses.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExternalDefensesModule } from './external-defenses/external-defenses.module';
import { InfoWindowComponent } from './info-window/info-window.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    InfoWindowComponent,
  ],
  imports: [
    BrowserModule,
    InternalDefensesModule,
    ExternalDefensesModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

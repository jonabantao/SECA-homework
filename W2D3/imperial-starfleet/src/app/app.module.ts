import { InternalDefensesModule } from './internal-defenses/internal-defenses.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExternalDefensesModule } from './external-defenses/external-defenses.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    InternalDefensesModule,
    ExternalDefensesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

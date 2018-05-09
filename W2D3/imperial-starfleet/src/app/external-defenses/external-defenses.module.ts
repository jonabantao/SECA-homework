import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarDestroyerComponent } from './star-destroyer/star-destroyer.component';
import { TieFighterComponent } from './tie-fighter/tie-fighter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StarDestroyerComponent,
    TieFighterComponent,
  ],
  exports: [
    StarDestroyerComponent,
    TieFighterComponent,
  ]
})
export class ExternalDefensesModule { }

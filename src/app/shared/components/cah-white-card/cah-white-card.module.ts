import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CahWhiteCardComponent } from './cah-white-card.component';

@NgModule({
  declarations: [CahWhiteCardComponent],
  exports: [
    CahWhiteCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CahWhiteCardModule { }

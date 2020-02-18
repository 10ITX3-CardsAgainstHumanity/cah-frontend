import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahRoomBadgeComponent} from './cah-room-badge.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CahRoomBadgeComponent],
  exports: [CahRoomBadgeComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class CahRoomBadgeModule { }

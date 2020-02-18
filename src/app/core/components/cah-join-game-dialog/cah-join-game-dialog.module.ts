import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahJoinGameDialogComponent} from './cah-join-game-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CahJoinGameDialogComponent],
  entryComponents: [CahJoinGameDialogComponent],
  exports: [CahJoinGameDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class CahJoinGameDialogModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CahJoinGameDialogComponent } from './cah-join-game-dialog.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CahJoinGameDialogComponent],
  entryComponents: [CahJoinGameDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class CahJoinGameDialogModule { }

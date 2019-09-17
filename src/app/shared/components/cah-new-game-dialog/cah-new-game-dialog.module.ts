import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CahNewGameDialogComponent } from './cah-new-game-dialog.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CahNewGameDialogComponent],
  entryComponents: [CahNewGameDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class CahNewGameDialogModule { }

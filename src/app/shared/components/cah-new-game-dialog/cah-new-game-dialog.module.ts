import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahNewGameDialogComponent} from './cah-new-game-dialog.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTooltipModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CahNewGameDialogComponent],
  entryComponents: [CahNewGameDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FontAwesomeModule,
    MatTooltipModule
  ]
})
export class CahNewGameDialogModule { }

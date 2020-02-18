import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahNewGameDialogComponent} from './cah-new-game-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CahNewGameDialogComponent],
  entryComponents: [CahNewGameDialogComponent],
  exports: [CahNewGameDialogComponent],
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
export class CahNewGameDialogModule {
}

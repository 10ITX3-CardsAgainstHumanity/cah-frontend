import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahTitleScreenComponent} from './cah-title-screen.component';
import {RouterModule, Routes} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: CahTitleScreenComponent
  }
];

@NgModule({
  declarations: [CahTitleScreenComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    MatRippleModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    RouterModule
  ]
})
export class CahTitleScreenModule {
}

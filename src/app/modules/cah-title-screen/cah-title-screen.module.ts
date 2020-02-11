import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CahTitleScreenComponent} from './cah-title-screen.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatDialogModule, MatInputModule, MatProgressSpinnerModule, MatRippleModule} from '@angular/material';
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

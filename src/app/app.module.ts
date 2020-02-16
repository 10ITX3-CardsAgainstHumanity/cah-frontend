import {ErrorHandler, Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppModuleRouting} from '@app/app.module.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import * as Sentry from '@sentry/browser';
import {environment} from '@env/environment';

if (environment.production) {
  console.log(environment)
  Sentry.init({
    dsn: environment.sentry.dsn,
    environment: environment.sentry.env
  });
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppModuleRouting,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [environment.production ? { provide: ErrorHandler, useClass: SentryErrorHandler } : []],
  bootstrap: [AppComponent]
})
export class AppModule {
}

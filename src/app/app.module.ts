import {ErrorHandler, Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppModuleRouting} from '@app/app.module.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import * as Sentry from '@sentry/browser';
import {environment} from '@env/environment';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {SocketIoModule} from 'ngx-socket-io';

if (environment.production) {
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
    CoreModule,
    SocketIoModule.forRoot({url: environment.io.url, options: {}}),
    environment.production ? [] : [AkitaNgDevtools.forRoot()]
  ],
  providers: [environment.production ? { provide: ErrorHandler, useClass: SentryErrorHandler } : []],
  bootstrap: [AppComponent]
})
export class AppModule {
}

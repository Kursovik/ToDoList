import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderModule } from './shared/ui/header/header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthInterceptor } from './shared/interseptors/auth.interceptor';
import { UserService } from './shared/services/users/user.service';
import { ToastModule } from 'primeng/toast';
import { GlobalMessageService } from './shared/services/global-message.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    RouterOutlet,
    HeaderModule,
    HttpClientModule,
    ToastModule,
  ],
  providers: [
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
    GlobalMessageService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

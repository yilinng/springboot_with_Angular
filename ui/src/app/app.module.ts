import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
//import { CommonModule } from '@angular/common';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // <-- NgModel lives here
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodosComponent } from './todos/todos.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';
import { BannerComponent } from './components/banner/banner.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ServerErrorInterceptor } from './shared/ServerErrorInterceptor';
import { CustomDirective } from './Directive/custom.directive'
import { AdDirective } from './Directive/ad.directive';

@NgModule({
    declarations: [
        AppComponent,
        MessagesComponent,
        DashboardComponent,
        LoginComponent,
        SignupComponent,
        UserProfileComponent,
        TodoDetailComponent,
        TodosComponent,
        TodoSearchComponent,
        BannerComponent,
        PagenotfoundComponent,
        SpinnerComponent,
        CustomDirective,
        AdDirective,
    ],
    //https://medium.com/front-end-weekly/understanding-angular-http-interceptors-67078b2fcc0b
    //https://dev.to/this-is-angular/angular-error-interceptor-12bg?comments_sort=latest
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
        Title,
        CookieService
    ],
    bootstrap: [AppComponent],
    imports: [
        // CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
    ]
})

export class AppModule {

}

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { SurveyComponent } from './views/survey/survey.component';
import { HintsComponent } from './views/hints/hints.component';
import { ThanksComponent } from './views/thanks/thanks.component';
import { LoaderComponent } from './components/loader/loader.component';
import { Error404Component } from './views/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    SurveyComponent,
    HintsComponent,
    ThanksComponent,
    LoaderComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    NgSelectModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: 'https://api-survey-ifal.herokuapp.com/graphql'
      }),
      cache: new InMemoryCache()
    });
  }
}

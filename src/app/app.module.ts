import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SampleComponent } from './sample/sample.component';
import { LayoutModule } from './pages/layout.module';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModeToggleModule } from './shared/mode-toggle/mode-toggle.module';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { NgChartsModule } from 'ng2-charts';
import { NgxEditorModule } from 'ngx-editor';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBlAtDNjjp49JdGiNI687twaaCQ2EBIa9c',
  authDomain: 'angular-2023-bb816.firebaseapp.com',
  projectId: 'angular-2023-bb816',
  storageBucket: 'angular-2023-bb816.appspot.com',
  messagingSenderId: '1090245849483',
  appId: '1:1090245849483:web:2f2713aa29cc6ba381ff8e',
  measurementId: 'G-165ERMPD4K',
};

// Initialize Firebase

/* const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app); */
@NgModule({
  declarations: [AppComponent, SampleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ModeToggleModule,
    NgChartsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    RouterModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

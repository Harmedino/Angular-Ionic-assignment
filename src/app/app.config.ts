import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"coursepath-611b4","appId":"1:871100840575:web:5e429cf082644758e79d4a","storageBucket":"coursepath-611b4.appspot.com","apiKey":"AIzaSyCJhH5StJNI74pyq1QBN1EBdBzT9OOdv0c","authDomain":"coursepath-611b4.firebaseapp.com","messagingSenderId":"871100840575","measurementId":"G-QPXHHXEXDH"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))],
};

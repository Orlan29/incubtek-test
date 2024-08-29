import {ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor, errorsHandlerInterceptor } from "@incubtek/core/interceptors";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARguCLvUMAFO8ZgrfK5iysdWdF8nPf5nc",
  authDomain: "incubtek-test.firebaseapp.com",
  projectId: "incubtek-test",
  storageBucket: "incubtek-test.appspot.com",
  messagingSenderId: "282147597803",
  appId: "1:282147597803:web:11f0404b7c58ac32d7fdae"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorsHandlerInterceptor, authInterceptor])),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
};

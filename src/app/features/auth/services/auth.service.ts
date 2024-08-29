import {inject, Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {Router} from "@angular/router";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  updateProfile,
  User,
  user
} from "@angular/fire/auth";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({ providedIn: "root" })
export class AuthService {
  private _router = inject(Router);
  private _firebaseAuth = inject(Auth);
  public currentUser = toSignal<User | null>(user(this._firebaseAuth), { initialValue: null });

  public register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this._firebaseAuth,
      email,
      password,
    ).then((response) =>
      updateProfile(response.user, { displayName: 'username' }),
    );
    return from(promise);
  }

  public login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this._firebaseAuth,
      email,
      password,
    ).then((response) => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this._firebaseAuth);
    this._router.navigate(['/auth']);
    return from(promise);
  }
}


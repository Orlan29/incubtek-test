import {Component, inject, OnInit} from "@angular/core";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {FormErrorComponent, FormFieldComponent, FormIconComponent} from "@incubtek/ui/form-field";
import {ButtonComponent} from "@incubtek/ui/button/button.component";
import {getFormControlErrorText} from "@incubtek/core/utils";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "@incubtek/features/auth";
import {finalize} from "rxjs";
import {CoreNotification} from "@incubtek/ui/notification";

@Component({
  selector: '',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    RouterLink,
    MatIcon,
    FormFieldComponent,
    ButtonComponent,
    FormIconComponent,
    ReactiveFormsModule,
    FormErrorComponent,
    CoreNotification
  ]
})
export class RegisterComponent implements OnInit {
  protected readonly getFormControlErrorText = getFormControlErrorText;
  public registerForm!: FormGroup;
  private _fb = new FormBuilder();
  private _authService = inject(AuthService);
  private _router = inject(Router);

  public errorMessage!: string;

  public get emailControl(): AbstractControl {
    return this.registerForm.get('email') as AbstractControl;
  }

  public get passwordControl(): AbstractControl {
    return this.registerForm.get('password') as AbstractControl;
  }

  public get usernameControl(): AbstractControl {
    return this.registerForm.get('username') as AbstractControl;
  }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      username: new FormControl<string | null>(null, [Validators.required]),
      password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  public onRegister(): void {
    if (this.registerForm.invalid) return;
    this.registerForm.disable();
    const { email, username, password } = this.registerForm.getRawValue();

    this._authService.register(email, username, password)
      .pipe(finalize(() => this.registerForm.enable()))
      .subscribe({
        next: _ => this._router.navigate(['/portal', 'dashboard']),
        error: error => this.errorMessage = error.code
      });
  }
}

import {Component, inject, OnInit} from '@angular/core';
import {ButtonComponent} from "@incubtek/ui/button/button.component";
import {
  FormErrorComponent,
  FormFieldComponent,
  FormIconComponent,
  FormInputComponent,
  FormLabelComponent
} from "@incubtek/ui/form-field";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {getFormControlErrorText} from "@incubtek/core/utils";
import {AuthService} from "@incubtek/features/auth/services/auth.service";
import {finalize} from "rxjs";
import {CoreNotification} from "@incubtek/ui/notification";

@Component({
  selector: '',
  standalone: true,
  imports: [
    ButtonComponent,
    FormFieldComponent,
    FormIconComponent,
    FormInputComponent,
    FormLabelComponent,
    FormErrorComponent,
    MatIcon,
    RouterLink,
    ReactiveFormsModule,
    CoreNotification,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  public get emailControl(): AbstractControl {
    return this.loginForm.get('email') as AbstractControl;
  }

  public get passwordControl(): AbstractControl {
    return this.loginForm.get('password') as AbstractControl;
  }

  protected readonly getFormControlErrorText = getFormControlErrorText;
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  public passwordVisible = false;
  public errorMessage!: string;

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: new FormControl<string | null>(null, [Validators.email, Validators.required]),
      password: new FormControl<string | null>(null, Validators.required)
    });
  }

  public login(): void {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.getRawValue();
    this.loginForm.disable();

    this._authService.login(email, password)
      .pipe(finalize(() => this.loginForm.enable()))
      .subscribe({
        next: _ => this._router.navigate(['/portal', 'dashboard']),
        error: error => this.errorMessage = error.code
      });
  }
}

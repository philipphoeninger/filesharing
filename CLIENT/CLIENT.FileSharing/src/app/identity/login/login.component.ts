import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IdentityApiService } from '../shared/identity-api.service';
import { LoginModel } from '../shared/login.model';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'fs-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class LoginComponent implements OnInit {
  public loginErrorMessage?: string;
  public showLanguageSelection = true;

  public languages = [
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
    { value: 'fr', label: 'Français' },
  ];
  public selectedLanguage = 'en';

  protected username?: string;
  protected password?: string;
  public keepSignedIn: boolean = false;

  constructor(
    private identityApiService: IdentityApiService,
    private router: Router,
  ) {}

  ngOnInit() {}

  onGotoRegister() {
    this.router.navigateByUrl('/register');
  }

  onSubmit(form: NgForm, event: Event) {
    event.preventDefault();
    let loginCommand = new LoginModel(this.username!, this.password!);

    // TODO: start spinner
    this.identityApiService
      .login(loginCommand)
      .pipe(
        map((response: any) => {
          debugger;
          // TODO: check if login succeeded (check status code)
          localStorage.setItem('fileshare-token', response.token);
          this.router.navigateByUrl('/home');
        }),
        finalize(() => {
          // TODO: stop spinner
        }),
      )
      .subscribe();
  }
}

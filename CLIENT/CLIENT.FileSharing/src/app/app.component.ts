import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { LoginComponent } from './identity/login/login.component';
import { AuthService } from './identity/shared/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToolbarComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CLIENT.FileSharing';
  loggedIn = false;

  constructor(private authService: AuthService) {
    this.loggedIn = authService.isAuthenticated();
  }
}

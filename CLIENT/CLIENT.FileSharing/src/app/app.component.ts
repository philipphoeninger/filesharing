import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { LoginComponent } from './identity/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToolbarComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CLIENT.FileSharing';
}

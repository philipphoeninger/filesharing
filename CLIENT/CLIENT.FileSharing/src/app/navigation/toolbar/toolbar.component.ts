import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../../identity/shared/auth.service';

@Component({
  selector: 'fs-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    protected authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {}

  onHomeClicked() {
    alert('Home clicked');
  }

  onUploadsClicked() {
    alert('Uploads clicked');
  }

  onMyLinksClicked() {
    alert('My Links clicked');
  }

  onSharedWithMeClicked() {
    alert('Shared with me clicked');
  }
}

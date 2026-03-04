import { Component, inject } from '@angular/core';
import { Stored_Keys } from '../../constants/stored-keys';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly router = inject(Router);

  userData = JSON.parse(localStorage.getItem(Stored_Keys.userData)!);

  logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}

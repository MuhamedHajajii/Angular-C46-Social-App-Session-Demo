import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-feed-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './feed-side-bar.component.html',
  styleUrl: './feed-side-bar.component.css',
})
export class FeedSideBarComponent {}

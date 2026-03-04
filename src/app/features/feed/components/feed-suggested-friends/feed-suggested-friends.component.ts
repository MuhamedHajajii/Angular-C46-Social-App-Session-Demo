import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Suggestion } from '../../interfaces/IGetFollowSuggestionsResponse';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-feed-suggested-friends',
  imports: [DecimalPipe],
  templateUrl: './feed-suggested-friends.component.html',
  styleUrl: './feed-suggested-friends.component.css',
})
export class FeedSuggestedFriendsComponent {
  // injected services
  private readonly feedService = inject(FeedService);

  isFollowed = false;
  isLoading = false;
  mutualFollowersCount = 5;
  @Input() suggestion!: Suggestion;
  @Output() refreshView = new EventEmitter();
  followUser(userId: string): void {
    this.isLoading = true;
    this.feedService.toggleFollowUsers(userId).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.isFollowed = true;
        this.suggestion.followersCount = response.data.followersCount;
        this.refreshView.emit();
      },
    });
  }
}

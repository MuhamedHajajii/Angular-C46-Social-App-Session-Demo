import { Component, inject, OnInit } from '@angular/core';
import { FeedSideBarComponent } from '../../components/feed-side-bar/feed-side-bar.component';
import { AllPostsComponent } from '../../../../shared/components/all-posts/all-posts.component';
import { FeedSuggestedFriendsComponent } from '../../components/feed-suggested-friends/feed-suggested-friends.component';
import { AddPostsComponent } from '../../../../shared/components/add-posts/add-posts.component';
import { FeedService } from '../../services/feed.service';
import { Post } from '../../interfaces/IAllPostsResponse';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Suggestion } from '../../interfaces/IGetFollowSuggestionsResponse';

@Component({
  selector: 'app-feed-page',
  imports: [
    FeedSideBarComponent,
    AddPostsComponent,
    AllPostsComponent,
    InfiniteScrollDirective,
    FeedSuggestedFriendsComponent,
  ],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.css',
})
export class FeedPageComponent implements OnInit {
  private readonly feedService = inject(FeedService);

  allPosts!: Post[];
  isLoading = false;
  currentPage = 1;
  allFollowSuggestions!: Suggestion[];

  ngOnInit(): void {
    this.getAllPosts();
    this.getFollowSuggestions();
  }

  getAllPosts(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.feedService.getAllPosts(this.currentPage).subscribe({
      next: (response) => {
        console.log(response);
        if (this.allPosts) {
          this.allPosts.push(...response.data.posts);
        } else {
          this.allPosts = response.data.posts;
        }
        this.isLoading = false;
      },
    });
  }

  getFollowSuggestions() {
    this.feedService.getAllSuggestions().subscribe({
      next: (response) => {
        this.allFollowSuggestions = response.data.suggestions.map((suggestionUser) => {
          return { ...suggestionUser, name: suggestionUser.name.split(' ').slice(0, 2).join(' ') };
        });
        console.log('getFollowSuggestions', response);
      },
    });
  }

  onScroll(): void {
    ++this.currentPage;
    this.getAllPosts();
  }
}

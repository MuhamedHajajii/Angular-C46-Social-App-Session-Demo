import { Component, inject, Input } from '@angular/core';
import { Post } from '../../../features/feed/interfaces/IAllPostsResponse';
import { DatePipe } from '@angular/common';
import { CommentsService } from '../../../features/feed/services/comments.service';
import { AllCommentsComponent } from '../comments/all-comments/all-comments.component';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-all-posts',
  imports: [DatePipe, AllCommentsComponent, PostCardComponent],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.css',
})
export class AllPostsComponent {
  // injected services
  private readonly commentsService = inject(CommentsService);

  @Input() allPosts!: Post[];

  isShowTopComment = true;

  getPostComments(postID: string): void {
    this.commentsService.getAllComments(postID).subscribe({
      next: (response) => {
        console.log(response);
        this.isShowTopComment = false;
      },
    });
  }
}

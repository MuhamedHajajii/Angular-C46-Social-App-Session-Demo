import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../../features/feed/services/comments.service';
import { Post } from '../../../features/feed/interfaces/IAllPostsResponse';
import { DatePipe } from '@angular/common';
import { AllCommentsComponent } from '../comments/all-comments/all-comments.component';
import { Comment } from '../../../features/feed/interfaces/IGetPostCommentsResponse';
import { AddCommentComponent } from '../comments/add-comment/add-comment.component';

@Component({
  selector: 'app-post-card',
  imports: [DatePipe, AllCommentsComponent, AddCommentComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  // injected services
  private readonly commentsService = inject(CommentsService);

  @Input() post!: Post;
  isCommentsLoading = false;
  allComments!: Comment[];
  isShowTopComment = true;

  getPostComments(postID: string): void {
    if (this.isCommentsLoading) return;

    this.isCommentsLoading = true;
    this.commentsService.getAllComments(postID).subscribe({
      next: (response) => {
        this.isCommentsLoading = false;
        this.allComments = response.data.comments;
        console.log(response);
        this.isShowTopComment = false;
      },
    });
  }
}

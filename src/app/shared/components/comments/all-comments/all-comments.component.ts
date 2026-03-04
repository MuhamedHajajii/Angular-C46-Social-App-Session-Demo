import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment } from '../../../../features/feed/interfaces/IGetPostCommentsResponse';

@Component({
  selector: 'app-all-comments',
  imports: [DatePipe],
  templateUrl: './all-comments.component.html',
  styleUrl: './all-comments.component.css',
})
export class AllCommentsComponent {
  @Input() comment!: Comment;
}

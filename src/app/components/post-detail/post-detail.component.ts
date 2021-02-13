import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  id: number;
  userId: number;
  post: any;
  comments = [];
  filterString: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.id = +val.id;
      this.userId = +val.userId;
      this.userService.getPost(this.userId, this.id).subscribe(
        (val) => {
          this.post = val[0];
        },
        (error) => (this.errorMessage = error)
      );
    });
  }

  deletePost() {
    this.userService.deletePost(this.id).subscribe(
      (val) => {
        if (val === 'ok') {
          this.router.navigate(['posts', this.userId]);
        }
      },
      (error) => (this.errorMessage = error)
    );
  }

  seeComments() {
    this.userService.getComments(this.id).subscribe(
      (val: any) => {
        this.comments = val;
      },
      (error) => (this.errorMessage = error)
    );
  }
}

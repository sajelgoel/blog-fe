import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  userId: number;
  posts: any = [];
  filterString: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.userId = +val.userId;
      this.userService.getPosts(this.userId).subscribe(
        (res) => (this.posts = res),
        (error) => (this.errorMessage = error)
      );
    });
  }

  goToPost(id) {
    this.router.navigate(['posts', this.userId, id]);
  }
}

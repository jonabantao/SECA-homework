import { Component, OnInit } from '@angular/core';
import { User } from '../types/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent implements OnInit {

  user: User;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const userId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.usersService.getUser(userId)
      .subscribe(res => this.user = res);
  }

  editUser() {
    this.usersService.updateUser(this.user)
      .subscribe(() => this.router.navigate(['/']));
  }

}

import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: Pick<User, 'name'>;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userName = this.authService.userName;
  }

}

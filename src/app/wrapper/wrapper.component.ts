import {Component, OnInit} from '@angular/core';
import {IUser} from "../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit{
  profile: IUser | null = null;
  constructor(private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.authService.getProfile().subscribe({
      next: (profile) => (this.profile = profile),
      error: (err) => console.error(err),
    })
  }

}

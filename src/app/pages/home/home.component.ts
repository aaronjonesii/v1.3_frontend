import { Component, OnInit } from '@angular/core';
import { AppState, selectAuthState } from '../../app.state';
import { Store } from '@ngrx/store';
import { CheckAuthentication, LogOut } from '../../shared/auth/state/auth.actions';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { AuthService } from '../../core/services/auth.service';
import { NbWindowService } from "@nebular/theme";
import { MatBottomSheet } from '@angular/material';
import Typed from 'typed.js';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

declare var eva: any;

@Component({
  selector: 'anon-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Home Page';
  today = new Date();

  typed: any;
  options = {
    strings: ['Anonymous Systems', 'The LionsDen 🦁'],
    typeSpeed: 80,
    showCursor: false,
    fadeOut: true,
    loop: true,
    backDelay: 10000
  };


  getState: Observable<any> = this.getState = this.store.select(selectAuthState);
  isAuthenticated: boolean;
  user: User = {};
  errorMessage = null;
  redirectURL = null;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private windowService: NbWindowService,
    private bottomSheet: MatBottomSheet,
              ) {
     // Refresh time every second
    setInterval(() => {
      this.today = new Date();
    }, 1000);

    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });

    this.authService.redirectURL = this.redirectURL;

    if (!this.isAuthenticated) { this.store.dispatch(new CheckAuthentication()); }
  }

   openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent, {
      panelClass: ['bg-dark'],
      ariaLabel: 'WebApp Navigation'
      });
  }

  ngOnInit(): void {

    this.typed = new Typed('.element', this.options);

    // Because Eva icons are used in this component
    eva.replace();
  }

  logout(): void { this.store.dispatch(new LogOut); }

}

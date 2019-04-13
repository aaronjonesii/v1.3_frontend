import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './core/services/token-interceptor.service';
import { TodoComponent } from './pages/todo/todo.component';
import { AuthGuardService } from './core/services/authenticationguard.service';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BottomSheetComponent } from "./pages/home/bottom-sheet/bottom-sheet.component";
import { WebsocketService } from './core/services/websocket.service';
import { TasksService } from './core/services/tasks.service';
import { AUTH_COMPONENTS } from './shared/auth/auth.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.state';
import { CustomSerializer } from './shared/utils/storerouter';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './shared/auth/state/auth.effects';
import { TasksEffects } from './pages/todo/state/tasks.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoComponent,
    BottomSheetComponent,
    ...AUTH_COMPONENTS,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        SharedModule.forRoot(),
        NgbModule.forRoot(),
        SharedModule,
        StoreModule.forRoot(reducers),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
        EffectsModule.forRoot([AuthEffects, TasksEffects]),
    ],
  providers: [
    AuthGuardService,
    WebsocketService,
    TasksService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

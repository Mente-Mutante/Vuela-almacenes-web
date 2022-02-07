import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlidebarComponent } from './@presentation/components/slidebar/slidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './@presentation/components/header/header.component';
import { LoginComponent } from './@presentation/pages/login/login.component';
import { HttpClientModule} from '@angular/common/http';
// import { AngularEditorModule } from '@kolkov/angular-editor';
import { OrderComponent } from './@presentation/pages/order/order.component';
import { AuthorizationComponent } from './@presentation/pages/authorization/authorization.component';
import { AdministrationComponent } from './@presentation/pages/administration/administration.component';

/* ---------- */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentComponent } from './@presentation/pages/document/document.component';
@NgModule({
  declarations: [
    AppComponent,
    SlidebarComponent,
    HeaderComponent,
    LoginComponent,
    OrderComponent,
    AuthorizationComponent,
    AdministrationComponent,
    DocumentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    // AngularEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [ AngularFirestore ],
  bootstrap: [AppComponent]
})
export class AppModule { }

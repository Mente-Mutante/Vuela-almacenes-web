import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
// import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  user:boolean = false;
  showRegister:boolean = false;
  showDetail:boolean = false;
  row = [];
  rowCamera = [];
  

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.row.length = 20;
    this.rowCamera.length = 4;
  }
  ngAfterViewInit() {
    let hide = localStorage.getItem('hide');
    if(hide=='true'){
      document.getElementsByClassName('page')[0].setAttribute('style', 'margin-left:86px');
    }
    else{
      document.getElementsByClassName('page')[0].setAttribute('style', 'margin-left:295px');
    }
    document.getElementById('table-user').style.height=(window.innerHeight-250).toString()+'px';
  }

  sizeInit(){
    setTimeout(function () {
      document.getElementById('table-user').style.height=(window.innerHeight-350).toString()+'px';
      let hide = localStorage.getItem('hide');
      if(hide=='true'){
        document.getElementById('page').setAttribute('style', 'margin-left:86px');
      }
      else{
        document.getElementById('page').setAttribute('style', 'margin-left:295px');
      }
    }, 10);
  }
  sizeRegister(){
    let hide = localStorage.getItem('hide');
    if(hide=='true'){
      console.log(true);
      setTimeout(function () {
        document.getElementsByClassName('page-register')[0].setAttribute('style', 'margin-left:86px');
    }, 50);
    }
    else{
      console.log(false);
      setTimeout(function () {
        document.getElementsByClassName('page-register')[0].setAttribute('style', 'margin-left:295px');
      }, 50);
    }
  }

  closeSlider(){
    document.getElementById('slide').style.display = 'none';
  }
  
  openSlider(){
    document.getElementById('slide').style.display = 'block';
  }

}

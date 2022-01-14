import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // let location = this.location.path();
    // console.log(location);
    // if(location == ''){
    //   this.changeClass('row-admin');
    // }else{
    //   this.changeClass('row-'+this.location.path().substr(1,10));
    //   this.changeClassH('row-'+this.location.path().substr(1,10)+'-h');
    // }
    // let hide = localStorage.getItem('hide');
    // if(hide=='true'){
    //   document.getElementsByClassName('header-bar')[0].setAttribute('style', 'margin-left:86px;width:100%');
    //   document.getElementById('bar').style.display = 'none';
    //   document.getElementById('bar-hide').style.display = 'block';
    // }
    // else{
    //   document.getElementsByClassName('header-bar')[0].setAttribute('style', 'margin-left:295px');
    //   document.getElementById('bar').style.display = 'block';
    //   document.getElementById('bar-hide').style.display = 'none';
    // }
  }

  routeAdmin(){
    this.router.navigate(['admin']);
    this.changeClass('row-admin');
    this.changeClassH('row-admin-h');
  }

  routeConsole(){
    this.router.navigate(['console']);
    this.changeClass('row-console');
    this.changeClassH('row-console-h');
  }

  routeSupport(){
    this.router.navigate(['support']);
    this.changeClass('row-support');
    this.changeClassH('row-support-h');
  }

  routeConfig(){
    this.router.navigate(['config']);
    this.changeClass('row-config');
    this.changeClassH('row-config-h');
  }

  routeOrder(){
    this.router.navigate(['order']);
    this.changeClass('row-order');
    this.changeClassH('row-order-h');
  }

  routeAuthorization(){
    this.router.navigate(['authorization']);
    this.changeClass('row-authorization');
    this.changeClassH('row-authorization-h');
  }

  routeAdministration(){
    this.router.navigate(['administration']);
    this.changeClass('row-administration');
    this.changeClassH('row-administration-h');
  }

  changeClass(id){
    document.getElementById('row-order').setAttribute('class','row-option');
    document.getElementById('row-authorization').setAttribute('class','row-option');
    document.getElementById('row-administration').setAttribute('class','row-option');
    document.getElementById(id).setAttribute('class','row-selected');
  }

  changeClassH(id){
    document.getElementById('row-order-h').setAttribute('class','row-option');
    document.getElementById('row-authorization-h').setAttribute('class','row-option');
    document.getElementById('row-administration-h').setAttribute('class','row-option');
    document.getElementById(id).setAttribute('class','row-selected');
  }

  hideBar(){
    localStorage.setItem('hide','true');
    document.getElementById('bar').style.display = 'none';
    document.getElementById('bar-hide').style.display = 'block';
    document.getElementById('page').setAttribute('style', 'margin-left:86px');
    document.getElementsByClassName('header-bar')[0].setAttribute('style', 'margin-left:86px;width:100%');
    setTimeout(function () {
      
    }, 50);
  }

  expandBar(){
    localStorage.setItem('hide','false');
    document.getElementById('bar').style.display = 'block';
    document.getElementById('bar-hide').style.display = 'none';
    document.getElementById('page').setAttribute('style', 'margin-left:295px');
    document.getElementsByClassName('header-bar')[0].setAttribute('style', 'margin-left:295px');
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = {
    email: "",
    password: "",
    rol: "simple",
    nombre: ""
  }

  constructor(
    private router: Router,
    private authService : AuthService
    ) { }

  ngOnInit(): void {
  }

  ingresarConGoogle(){
    //console.log(this.usuario);
    const { email, password } = this.usuario;

    this.authService.loginWithGoogle( email, password ).then(res=>{
      console.log("resultado de respuesta: " , res);
      if ( res ) {
        this.router.navigate(["/order"]);
      }
      else{
        this.authService.logout();

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe ingresar un dominio valido como @vuela.bo',
        });

        this.router.navigateByUrl("/login");
      }
    });
  }

  ngAfterViewInit() {
    document.getElementById('login').style.width = window.innerWidth.toString()+'px';
    document.getElementById('login').style.height = window.innerHeight.toString()+'px';
    document.getElementsByTagName('app-header')[0].setAttribute('style','display:none');
    document.getElementsByTagName('app-slidebar')[0].setAttribute('style','display:none');
  }

  login(){
    document.getElementsByTagName('app-header')[0].setAttribute('style','display:block');
    document.getElementsByTagName('app-slidebar')[0].setAttribute('style','display:block');
    this.router.navigate(['admin']);
  }

}

import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../../utils/utils-url';
// import { AngularEditorConfig } from '@kolkov/angular-editor';

/*-----------*/
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDM4NDI3MTgsImV4cCI6MTY0Mzg4NTkxOH0.2XAF8HF315XLuMtjXo4OfZuRFHY9I4p0P6XNq8axq4Y'; 


  user:boolean = false;
  showRegister:boolean = false;
  showDetail:boolean = false;
  row = [];
  rowCamera = [];
  users = [];

  /* ---------- */
  rolForm!: FormGroup;

  listaDeUsuarios: any = [];
  ListaDeRoles: any = [
    {
      rol: 'Bodeguero'
    },
    {
      rol: 'Logistico'
    },
    {
      rol: 'Administrador'
    }
  ]

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService : AuthService,
    private http: HttpClient
    ) {}
  
    getUsers(){
      this.http.get<any>(Utils.BASE+'api/usuarios',{headers:{
          'x-token':this.token
      }}).subscribe(
          response => {
              this.users = response.data;
          });
    } 

  ngOnInit(): void {
    //this.row.length = 20;
    this.getUsers();
    this.rowCamera.length = 4;
    this.authService.getAll().then( firebaseResponse =>{
      firebaseResponse?.subscribe(listaDeUsuarioRef =>{

        this.listaDeUsuarios = listaDeUsuarioRef.map((usuarioRef: any) =>{
          let usuario: any = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          //console.log(usuario);
          return usuario;
        });

      });
    });

    this.rolForm = this.fb.group({
      role: ['', Validators.required],
    });
  }

  cambiarEstado(id: any, data: any){
    //console.log(id);
    this.authService.cambiarEstado(id, data);
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

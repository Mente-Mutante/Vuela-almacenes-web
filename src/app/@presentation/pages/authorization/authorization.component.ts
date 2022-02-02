import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../../utils/utils-url';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDM4NDI3MTgsImV4cCI6MTY0Mzg4NTkxOH0.2XAF8HF315XLuMtjXo4OfZuRFHY9I4p0P6XNq8axq4Y'; 

  user:boolean = false;
  showRegister:boolean = false;
  showDetail:boolean = false;
  state = '';
  row = [];
  orders = [];
  rowCamera = [];
  bills = [];
  areas = [];
  suppliers = [];
  items = [];
  items2 = [];
  orderDetail = {
    "proveedorID":null,
    "area_solicitanteID":null,
    "clienteID":null,
    "nit" : null,
    "forma_pago" : null,
    "descripcion" : null,
    "monedaID" : null,
    "ticket" : null,
    "tiempo_entrega" : null,
    "sub_total" : null,
    "descuento" : null,
    "total_compra" : null,
    "productos": []
  }
  @ViewChild('myNameElem') myNameElem: ElementRef;
  

  constructor(
    private router: Router,
    private http: HttpClient) {}

  getPendientes(){
    this.orders = [];
    this.http.get(Utils.BASE+'api/autorizacionespend?desde=2022-01-24&hasta=2022-01-28&estado=Pendiente',{headers:{
      'x-token':this.token
    }}).subscribe(
        (response:any) => {
            this.orders  = response.data;
        });
  }

  getProcesados(){
    this.orders = [];
    this.http.get(Utils.BASE+'api/autorizacionesproc?desde=2022-01-24&hasta=2022-01-28',{headers:{
      'x-token':this.token
    }}).subscribe(
        (response:any) => {
            this.orders  = response.data;
        });
  }

  getOrderDetail(id){
    return this.http.get<any>(Utils.BASE+'api/ocompra/'+id,{headers:{
      'x-token':this.token
    }}).subscribe(
      response => {
          this.orderDetail = response.data;
          console.log(response);
      });
  }

  getSupplier(){
    this.http.get<any>(Utils.BASE+'api/proveedores',{headers:{
        'x-token':this.token
    }}).subscribe(
        response => {
            this.suppliers = response.data;
        });
  } 

  getBill(){
    this.http.get<any>(Utils.BASE+'api/monedas',{headers:{
      'x-token':this.token
    }}).subscribe(
        response => {
            this.bills = response.data;
        });
  }

  getAreas(){
    this.http.get<any>(Utils.BASE+'api/area',{headers:{
      'x-token':this.token
    }}).subscribe(
        response => {
            console.log(response);
            this.areas = response.data;
        });
  }

  getItems(){
    return this.http.get<any>(Utils.BASE+'api/item',{headers:{
      'x-token':this.token
    }}).subscribe(
        response => {
            this.items = response.data;
            this.items2 = response.data;
        });
  } 



  changeTab(id){
    if(id == 'btn-procesados'){
      this.getProcesados();
    } else if(id == 'btn-pendientes'){
      this.getPendientes();
    }
    document.getElementById('btn-procesados').className = 'btn-tab-inactive';
    document.getElementById('btn-pendientes').className = 'btn-tab-inactive';
    document.getElementById(id).className = 'btn-tab-active';
  }

  changeState(id,state){
    this.http.put<any>(Utils.BASE+'api/autorizaciones/'+id,{
      "estado" : state
    },{headers:{
      'x-token':this.token
    }}).subscribe(
        response => {
            console.log(response);
            this.changeTab('btn-pendientes');
        });
  }

  ngOnInit(): void {
    this.row.length = 20;
    this.rowCamera.length = 4;
    this.getPendientes();
    this.getSupplier();
    this.getBill();
    this.getItems();
    this.getAreas();
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

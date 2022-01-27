import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { OrderService } from '../../services/order.service';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../../utils/utils-url';
// import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})


export class OrderComponent implements OnInit {
  
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDMyOTc5NDMsImV4cCI6MTY0MzM0MTE0M30.XeDU3GyYWnNAoGto17ITj8O6vRsB6KYE-9jyc3ZcgF0'; 

  user:boolean = false;
  showRegister:boolean = false;
  showDetail:boolean = false;
  row = [];
  rowCamera = [];
  orders = [];
  suppliers = [];
  bills  = [];
  items  = [];
  comments = [];
  orderForm = {
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
  };
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
  

  constructor(
    private router: Router,
    private orderService: OrderService,
    private http: HttpClient
    ) {}

  getSupplier(){
    this.http.get<any>(Utils.BASE+'api/proveedores',{headers:{
        'x-token':this.token
    }}).subscribe(
        response => {
            this.suppliers = response.data;
        });
  } 

  getOrder(){
    this.http.get(Utils.BASE+'api/ocompra',{headers:{
      'x-token':this.token
    }}).subscribe(
        (response:any) => {
            this.orders  = response.compra_detalle;
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

  getItems(){
    return this.http.get<any>(Utils.BASE+'api/item',{headers:{
      'x-token':this.token
    }}).subscribe(
        response => {
            this.items = response.data;
            // console.log(response);
        });
  } 

  getComments(id){
    return this.http.get<any>(Utils.BASE+'api/comentarios/'+id,{headers:{
      'x-token':this.token
    }}).subscribe(
      response => {
          this.comments = response.data;
          console.log(response);
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

  //luego le mando los parametros del formulario ;)
  createOrder(){
    return this.http.post<any>(Utils.BASE+'api/ocompra',
    {
      "proveedorID" : "1",
      "area_solicitanteID" : "4",
      "clienteID" : "1",
      "nit" : "123456790",
      "forma_pago" : "contado",
      "descripcion" : "descripcion texto 2",
      "monedaID" : "1",
      "ticket" : "1",
      "tiempo_entrega" : "30 dias",
      "sub_total" : "340",
      "descuento" : "100",
      "total_compra" : "980",
      "productos" : [
          {
              "itemID" : "1",
              "cantidad" : "4",
              "monto" : "100"
          },
          {
              "itemID" : "2",
              "cantidad" : "4",
              "monto" : "120"
          }
      ]
  }
    ,
        {headers:{
            'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDMwMzI1NDUsImV4cCI6MTY0MzA3NTc0NX0.LWcPZo3kTds4fr4zsCqaDmwD-cpX0X58j3V3ae4zYHs'
        }}).subscribe(  
            response => {
                console.log(response);
                this.getOrder();
                return response;
            });

  }

  async ngOnInit() {
    this.row.length = 20;
    this.rowCamera.length = 4;
    this.getOrder();
    this.getSupplier();
    this.getBill();
    this.getItems();
    // this.orders = await this.orderService.getOrder();
    // this.orders = res.compra_detalle;
    // console.log(this.orders);
  }
  logorder(){
    console.log(this.orders);
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
    // console.log(this.orderService.getOrder());
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

  downloadPdf(){
    const DATA = document.getElementById('table-pdf');
    const doc = new jsPDF('l', 'mm', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      // const logo = canvas.toDataURL('assets/images/Grupo 6.svg');
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width - 15;
      // doc.addImage(logo, 'PNG');
      // doc.cell(1 ,3 , pdfWidth/3, 8, 'Hola',10,'Center');
      // doc.cell(1 ,3 , pdfWidth/3, 8, 'Hola',10,'Center');
      // doc.cell(1 ,3 , pdfWidth/3, 8, 'Hola',10,'Center');
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}.pdf`);
    });  
  }
}


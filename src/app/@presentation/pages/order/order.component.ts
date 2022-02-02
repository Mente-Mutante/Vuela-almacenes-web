import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { OrderService } from '../../services/order.service';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Utils } from '../../utils/utils-url';
// import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})


export class OrderComponent implements OnInit {
  
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDM4NDI3MTgsImV4cCI6MTY0Mzg4NTkxOH0.2XAF8HF315XLuMtjXo4OfZuRFHY9I4p0P6XNq8axq4Y'; 

  user:boolean = false;
  showRegister:boolean = false;
  showDetail:boolean = false;
  itemSelected : string;
  fileToUpload: any;
  idOrderFile: any;
  row = [];
  files = [];
  rowCamera = [];
  orders = [];
  suppliers = [];
  bills  = [];
  areas = [];
  items  = [];
  items2 = [];
  itemsAdd = [];
  subTotal : number = 0;
  desc: number = 0;
  total: number = 0;
  comments = [];
  periodo: any;
  estado: any;
  orderForm = {
    "fecha":null,
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

  selectItem(id){
    console.log(id);
    this.items2.forEach(e =>{
        if(e.itemID == id){
          this.itemsAdd.push(e);
        }      
    });
    this.itemsAdd.forEach(e=>{
      this.subTotal += Number(e.precio_bs_referencial) ;
    });
    this.subTotal.toFixed(2);
    this.total = this.subTotal;
    // modal-buscar-producto
    document.getElementById("btnCloseModalBuscarProducto").click();
  }

  deleteItem(id){
    console.log(id);
    this.itemsAdd.forEach((e,i)=>{
      if(e.itemID == id){
        this.itemsAdd.splice(i,1);
      }   
    });
  }

  handleFileInput(event){
    // this.fileToUpload = files.item(0);
    console.log(event);
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
  }

  uploadFile(id){ 
    console.log(this.fileToUpload);
    const formData = new FormData();
    formData.append("archivo", this.fileToUpload);
    formData.append("compraID", id);
    formData.append("registradoPortID", '2');
    fetch(Utils.BASE+'api/archivos',{
      method: 'POST',
      headers:{
        'Content-Type':'multipart/form-data; ',
        'x-token': this.token
      },
      body: formData
    })
    // return this.http.post<any>(Utils.BASE+'api/archivos',formData,{
    //   headers: {
    //     'Content-Type':'multipart/form-data; ',
    //     'x-token': this.token
    //   }
    // }
    // ).subscribe(
    //     response => {
    //         console.log(response);
    //         // this.getOrder();
    //     });
  }


  getSupplier(){
    this.http.get<any>(Utils.BASE+'api/proveedores',{headers:{
        'x-token':this.token
    }}).subscribe(
        response => {
            this.suppliers = response.data;
        });
  } 

  filterOrder(start, end) {
    //2022-01-25
    this.http.get(Utils.BASE+'pi/ocompra?estado=Pendiente&desde='+start+'&hasta='+end+'',{headers:{
      'x-token':this.token
    }}).subscribe(
        (response:any) => {
            this.orders = [];
            this.orders  = response.data;
        });
  }

  getOrder(){
    this.http.get(Utils.BASE+'api/ocompra?estado=&desde=&hasta=',{headers:{
      'x-token':this.token
    }}).subscribe(
        (response:any) => {
            this.orders  = response.data;
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

  getFiles(id){
    this.idOrderFile = id;
    this.files = [];
    return this.http.get<any>(Utils.BASE+'api/archivos/'+id,{headers:{
      'x-token':this.token
    }}).subscribe(
        res => {
          this.files = res.data;
        },
      //   err => {
      //     this.files = [];
      // }
      );
        
  }

  deleteFile(id){
    // console.log(id);
    // document.getElementById("btnCloseUploadmodal"+id).click();
    return this.http.delete<any>(Utils.BASE+'api/archivos/'+id,{headers:{
      'x-token':this.token
    }}).subscribe(
        res => {
          // document.getElementById("btn-close-upload-"+id).click();
          this.getFiles(this.idOrderFile)
        },
      //   err => {
      //     this.files = [];
      // }
      );
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

  getComments(id){
    this.comments = [];
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

  deleteOrder(id){
    return this.http.delete<any>(Utils.BASE+'api/ocompra/'+id,{headers:{
      'x-token':this.token
    }}).subscribe(
        response => {
            console.log(response);
            this.getOrder();
        });
  }

  //luego le mando los parametros del formulario ;)
  createOrder(){
    var productos = [];
    this.itemsAdd.forEach( e=> {
      productos.push({'itemID':e.itemID,'cantidad':1,'monto':e.precio_bs_referencial});
    });
    console.log(productos);
    console.log(this.subTotal.toString());
    console.log(this.total.toString());
    return this.http.post<any>(Utils.BASE+'api/ocompra',
    {
      "proveedorID" : this.orderForm.proveedorID,
      "area_solicitanteID" : this.orderForm.area_solicitanteID,
      "clienteID" : "1",
      "nit" : this.orderForm.nit,
      "forma_pago" : this.orderForm.forma_pago,
      "descripcion" : this.orderForm.descripcion,
      "monedaID" : this.orderForm.monedaID,
      "ticket" : this.orderForm.ticket,
      "tiempo_entrega" : this.orderForm.tiempo_entrega,
      "sub_total" : `${this.subTotal}`,
      "descuento" : "0",
      "total_compra" : `${this.total}`,
      "productos" : productos
  }
    ,
        {headers:{
            'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDMwMzI1NDUsImV4cCI6MTY0MzA3NTc0NX0.LWcPZo3kTds4fr4zsCqaDmwD-cpX0X58j3V3ae4zYHs'
        }}).subscribe(  
            response => {
                console.log(response);
                document.getElementById("btnCloseModalGenerarOrden").click();
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
    this.getAreas();
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


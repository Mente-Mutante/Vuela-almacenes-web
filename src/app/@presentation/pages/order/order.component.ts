import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})


export class OrderComponent implements OnInit {
  
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


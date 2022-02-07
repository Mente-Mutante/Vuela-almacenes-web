import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  @Input() codigo: any;
  @Input() proveedor: any;
  @Input() area: any;
  @Input() facturar: any;
  @Input() fecha: any;
  @Input() nit: any;
  @Input() forma_pago: any;
  @Input() descripcion: any;
  @Input() moneda: any;
  @Input() ticket: any;
  @Input() entrega: any;
  
  @Input() items = [];
  @Input() subtotal: any;
  @Input() total: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.codigo);
  }

}

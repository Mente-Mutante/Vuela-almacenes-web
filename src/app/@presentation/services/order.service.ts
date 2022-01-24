import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../utils/utils-url';import { map } from 'rxjs/operators';
 ;

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    constructor (
        private http: HttpClient
    ){}

    async getOrder(){
    return this.http.get(Utils.BASE+'api/ocompra',{headers:{
        'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDMwMzI1NDUsImV4cCI6MTY0MzA3NTc0NX0.LWcPZo3kTds4fr4zsCqaDmwD-cpX0X58j3V3ae4zYHs'
    }}).subscribe(
        response => {
            console.log(response);
            return response;
        });
    }

    createOrder(body){
        return this.http.post<any>(Utils.BASE+'api/ocompra',body,
        {headers:{
            'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDMwMzI1NDUsImV4cCI6MTY0MzA3NTc0NX0.LWcPZo3kTds4fr4zsCqaDmwD-cpX0X58j3V3ae4zYHs'
        }}).subscribe(  
            response => {
                console.log(response);
                return response;
            });
    }

    getBill(){
        return this.http.get<any>(Utils.BASE+'api/monedas',{headers:{
            'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDMwMzI1NDUsImV4cCI6MTY0MzA3NTc0NX0.LWcPZo3kTds4fr4zsCqaDmwD-cpX0X58j3V3ae4zYHs'
        }}).subscribe(
            response => {
                console.log(response);
                return response;
            });
    }

    getSupplier(){
        return this.http.get<any>(Utils.BASE+'api/proveedores',{headers:{
            'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDMwMzI1NDUsImV4cCI6MTY0MzA3NTc0NX0.LWcPZo3kTds4fr4zsCqaDmwD-cpX0X58j3V3ae4zYHs'
        }}).subscribe(
            response => {
                console.log(response);
                return response;
            });
    } 
    
    getStore(){
        return this.http.get<any>(Utils.BASE+'api/almacenes',{headers:{
            'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDMwMzI1NDUsImV4cCI6MTY0MzA3NTc0NX0.LWcPZo3kTds4fr4zsCqaDmwD-cpX0X58j3V3ae4zYHs'
        }}).subscribe(
            response => {
                console.log(response);
                return response;
            });
    } 

    getItems(){
        return this.http.get<any>(Utils.BASE+'api/item',{headers:{
            'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDMwMzI1NDUsImV4cCI6MTY0MzA3NTc0NX0.LWcPZo3kTds4fr4zsCqaDmwD-cpX0X58j3V3ae4zYHs'
        }}).subscribe(
            response => {
                console.log(response);
                return response;
            });
    } 
}
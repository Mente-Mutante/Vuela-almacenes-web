import { Injectable } from '@angular/core';
/* ------- */

import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../utils/utils-url';
//import { auth } from 'firebase/app';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 constructor(
    private afauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private http: HttpClient
    ) { }

  async register(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en registro: ", err);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  async loginWithGoogle(email: string, password: string) {
    try {

      //buscar dominio antes del login con modal de google
      let respuesta = await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      console.log(respuesta);
      let email_buscar = respuesta.user?.email;

      // esta es la palabra a buscar
      let termino = "@vuela.bo";
      // para buscar la palabra hacemos
      let posicion = email_buscar?.indexOf(termino);
      if (posicion !== -1){
      // si encuentra -1 significa que encontrĂ³ el valor buscado en el correo
      let NuevousuarioAntes = {
        email: respuesta.user?.email,
        password: password,
        rol: "Bodeguero",
        nombre: respuesta.user?.displayName,
        estado: 1
      }

      // consultando bd mysql
      return this.http.post<any>(Utils.BASE+'api/loginG',
      {
          "email" : respuesta.user?.email,
          "nombre" : respuesta.user?.displayName,
          "foto": respuesta.user?.photoURL
      }
      ,
        {headers:{
            'x-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJpYXQiOjE2NDMyOTc5NDMsImV4cCI6MTY0MzM0MTE0M30.XeDU3GyYWnNAoGto17ITj8O6vRsB6KYE-9jyc3ZcgF0'
        }}).subscribe(  
            response => {
                console.log(response);
                //this.getOrder();
                return response;
      });







      // let registro = await this.firestore.collection("usuarios").add(NuevousuarioAntes);
      // //actualizando registro agregando el id
      // let Nuevousuario = {
      //   email: respuesta.user?.email,
      //   password: password,
      //   rol: "Bodeguero",
      //   nombre: respuesta.user?.displayName,
      //   estado: 1,
      //   id: registro.id,
      //   imagen_google: respuesta.user?.photoURL
      // }
      // this.firestore.collection("usuarios").doc(registro.id).set(Nuevousuario);

      //     return true;

      }
      else
      return false;
    } catch (err) {
      console.log("error en login con google: ", err);
      return null;
    }
  }


  async getAll(){
    try {
      return await this.firestore.collection("usuarios").snapshotChanges();
    } catch (error) {
      console.log("error en getAll: " + error);
      return null;
    }
  }

  async getById(id: any){
    try {
      return await this.firestore.collection("usuarios").snapshotChanges();
    } catch (error) {
      console.log("error en getById: " + error);
      return null;
    }
  }

  async update(id: any, data:any){
    try {
      return await this.firestore.collection("usuarios").doc().set(data);
    } catch (error) {
      console.log("error en update: " + error);
      return null;
    }
  }

  async cambiarEstado(id: any, data: any){
    var estado_seteado = data.estado == 0 ? 1 : 0;
    //console.log(estado_seteado);
    //console.log(data);
    let nuevoUsuario = {
      email: data.email,
      password: data.password,
      rol: data.rol,
      nombre: data.nombre,
      estado: estado_seteado,
      id: data.id,
      imagen_google: data.imagen_google
    }
    try {
      return await this.firestore.collection("usuarios").doc(id).set(nuevoUsuario);
    } catch (error) {
      console.log("error en cambiar estado: " + error);
      return null;
    }
  }



  getUserLogged() {
    return this.afauth.authState;
  }

  logout() {
    this.afauth.signOut();
  }

  // async crearUsuarioFirestore( collection: any, data: any ){
  //   return await this.firestore.collection(collection).add(data);
  // }

}

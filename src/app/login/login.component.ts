import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  message="";
  email="";
  password="";
  
  constructor(private firebaseService:FirebaseService, private router:Router){}

  onLogin(){
   this.firebaseService.login(this.email,this.password).then(()=>{
    this.router.navigate(["/"]);
    
   }).catch(()=>{
    this.message = " Please Enter Valied Email and Password!"
   })
  }
  onGoogle(){
    this.firebaseService.google().then(()=>{
      this.router.navigate(["/"]);
    })

  }
  onFacebook(){
    this.firebaseService.facebook().then(()=>{
      this.router.navigate(["/"]);
    })

  }

}

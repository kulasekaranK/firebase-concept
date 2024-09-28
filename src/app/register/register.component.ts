import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'], 
})
export class RegisterComponent {
  message = '';
  email = '';
  password = '';
  name = '';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private firestore: Firestore
  ) {}

  async onRegister() {
    try {
     
      const userCredential = await this.firebaseService.register(
        this.email,
        this.password
      );
      const uid = userCredential.user?.uid; 

      
      this.router.navigate(['/login']);

     
      const collectionRef = collection(this.firestore, 'users');
      await addDoc(collectionRef, {
        uid, 
        name: this.name,
        email: this.email,
      });

    
    } catch (error) {
  
      console.error('Error during registration:', error);
      this.message = 'Registration failed. Please try again.';
    }
  }
}

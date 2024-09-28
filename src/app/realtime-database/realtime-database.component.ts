import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { CommonModule } from '@angular/common';
import { Database, object } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { get, onValue, push, ref, remove, set } from 'firebase/database';

@Component({
  selector: 'app-realtime-database',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './realtime-database.component.html',
  styleUrl: './realtime-database.component.scss',
})
export class RealtimeDatabaseComponent implements OnInit {
  
fname:string = "";
lname:string = "";
phoneNumber:string = "";
email:string ="";
contacts:any[]=[];
constructor(private db:Database){}
  ngOnInit(): void {
    this.loadContact()
 }
 async add(){
  const contactRef = ref(this.db, `contact/${this.fname}`);

  await set(contactRef, {fname:this.fname,lname:this.lname,phoneNumber:this.phoneNumber,email:this.email})

 }
 async loadContact(){
  const contactRef = ref(this.db, "contact/");
   onValue(contactRef,(snapshot)=>{
  if(snapshot.exists()){
    const data = snapshot.val();
    this.contacts = Object.keys(data).map(key => data[key]);
    console.log(this.contacts);
    
  }
   });
 }
 async remove(name:any){
  const contactRef = ref(this.db,`contact/${name}`);
  await remove(contactRef)
 }
}

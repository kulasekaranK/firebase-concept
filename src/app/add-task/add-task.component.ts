import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormsModule,NgForm } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { Time } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  title="";
  description="";
  dueDate!:Timestamp;

  constructor(private firebase: FirebaseService, private router:Router) {}

  addTask() {
    const user = this.firebase.currentUser();
    if(user){
      this.firebase.addTask({
        title:this.title,
        description:this.description,
      duedate:this.dueDate,
       userId:user.uid,
        status:"pending"});
       this.title="";
       this.description="";
       this.router.navigate(['/'])
       
    }
  }
}

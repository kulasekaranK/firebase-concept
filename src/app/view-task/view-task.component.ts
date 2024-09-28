import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable, of } from 'rxjs';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent implements OnInit {
  tasks: Observable<any[]> = of([]);
  user: Observable<any[]> = of([]);
  users: any;

  constructor(
    private firebase: FirebaseService,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firebase.user$.subscribe((value) => {
      this.users = value;
      if (this.users) {
        this.view();
        this.profileView();
      }
    });
  }

  async view() {
    try {
      const selectedCollection = collection(this.firestore, 'tasks');
      const queryTask = query(
        selectedCollection,
        where('userId', '==', this.users.uid)
      );

       onSnapshot(queryTask, (snapshot)=>{
        this.tasks = of(snapshot.docs.map((doc)=>({id:doc.id, ...doc.data()})))
      })
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async profileView() {
    try {
      const Collection = collection(this.firestore, 'users');
      const queryRef = query(Collection, where('uid', '==', this.users.uid));
      const doc = await getDocs(queryRef);

      this.user = of(doc.docs.map((val) => val.data()));
    } catch (error) {}
  }
  logOut() {
    this.firebase.logOut();
    this.router.navigate(['/login']);
  }
  editTask(task: any) {
    if (task.id) {
     
      this.router.navigate(['/edit-task', task.id]);
    } 
  }

  async deleteTask(task: any) {
    try {
      const docref = doc(this.firestore, `tasks/${task.id}`);
      await deleteDoc(docref);
     
    } catch (error) {}
  }

  async statusUpdate(task:any){
    try{
      const docRef = doc(this.firestore, `tasks/${task.id}`);
      await updateDoc(docRef,{status:"Completed"});
    
   
      
    }
    catch{}
  }
}

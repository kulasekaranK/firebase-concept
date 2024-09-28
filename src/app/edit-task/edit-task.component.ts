import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent implements OnInit {
  taskId: string = '';
  task$: Observable<any> = of([]);
  constructor(
    private firebase: FirebaseService,
    private firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('id')!;
      this.load();
    });
  }
  async load() {
    try {
      const docref = doc(this.firestore, `tasks/${this.taskId}`);
      const docSnap = await getDoc(docref);
      if (docSnap.exists()) {
        this.task$ = of(docSnap.data());
      }
    } catch {}
  }
  async update(f: any) {
    try {
      const docref = doc(this.firestore, `tasks/${this.taskId}`);
      await updateDoc(docref, {
        title: f.value.title,
        description: f.value.description,
        duedate: f.value.dueDate,
      });
      this.router.navigate(['/']);
    } catch (error) {
      console.error('error', error);
    }
  }
}

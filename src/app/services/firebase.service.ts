import { Injectable } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Database, ref, set } from '@angular/fire/database';
import { addDoc, Firestore } from '@angular/fire/firestore';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  User,
} from 'firebase/auth';
import {
  collection,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  task$: Observable<any[]> = of([]);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();



  constructor(private auth: Auth, private firestore: Firestore,) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  google() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  facebook() {
    return signInWithPopup(this.auth, new FacebookAuthProvider());
  }
  sendResetLink(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
  currentUser() {
    return this.auth.currentUser;
  }
  logOut() {
    return this.auth.signOut();
  }
  async addTask(task: {
    title: string;
    description: string;
    duedate: Timestamp;
    userId: string;
    status: string;
  }) {
    const selectCollection = collection(this.firestore, 'tasks');
    return addDoc(selectCollection, task);
  }
}

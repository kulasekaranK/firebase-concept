import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { deleteObject, getDownloadURL,getMetadata, listAll, Storage, uploadBytes} from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss',
})
export class StorageComponent {

  selectedFile: File | null = null;
  files$: Observable<any[]> = of([]);

  constructor(private storage: Storage, private firestore: Firestore) {
    this.loadfileFromFireStore();
  }

  async upload(fileInput: HTMLInputElement) {
    if (!this.selectedFile) {
      console.error('No file selected!');
      return;
    }

    try {
      const storageRef = ref(this.storage, `images/${this.selectedFile?.name}`);
    const collectionRef = collection(this.firestore, "files")
      await uploadBytes(storageRef, this?.selectedFile);
     const link = await getDownloadURL(storageRef);

     await addDoc(collectionRef, {name:this.selectedFile.name, url:link})
     this.selectedFile = null;
     fileInput.value ="";

     

      
    } catch {}
  }

  loadfileFromFireStore() {
    try {
      const collectionRef = collection(this.firestore, 'files');
      getDocs(collectionRef).then((querySnapshot) => {
        this.files$ = of(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });

      onSnapshot(collectionRef, (snapshot) => {
        this.files$ = of(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    } catch (error) {
      console.error('Error loading files from Firestore:', error);
    }
  }

  async selectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.selectedFile = input.files?.[0] || null;
    }
  }
  async delete(file:any){
    const storageRef = ref(this.storage, `images/${file.name}`);
    const docRef = doc(this.firestore, 'files', file.id);
    await deleteObject(storageRef);
    await deleteDoc(docRef)
    console.log("Successfully deleted");
  }


  // async loadFile() {
  //   try {
  //     const storageRef = ref(this.storage, 'images/');
  //     const result = await listAll(storageRef);
  //     this.downloadLink = await Promise.all(
  //       result.items.map(async (itemRef: any) => {
  //         const url = await getDownloadURL(itemRef);
  //         return { name: itemRef.name, url };
  //       })
  //     );
  //   } catch {}
  // }
}

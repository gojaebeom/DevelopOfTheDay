import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { deleteObject, getDownloadURL, Storage } from '@angular/fire/storage';
import { addDoc, collection, Timestamp } from '@firebase/firestore';

import { ref, uploadBytes } from '@firebase/storage';

import { from, of, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostImageService {

    constructor(
        private readonly fireStore: Firestore 
    ) {}
    
    createImage(postId: string, imageUrls: string[]) {
        if(!imageUrls.length){
            return of(true);
        }
        return from(imageUrls)
            .pipe(
                switchMap(imageUrl => {
                    return from(addDoc(collection(this.fireStore, 'post-images'), {
                        postId,
                        imageUrl,
                        createdAt: Timestamp.now()
                    }));
                })
            );
    }
}

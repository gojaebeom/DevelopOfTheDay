import { Injectable } from "@angular/core";
import { deleteObject, getDownloadURL, Storage, uploadBytes } from "@angular/fire/storage";
import { ref } from "@firebase/storage";
import { from, switchMap, take } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(
        private readonly storage: Storage
    ) {}

    uploadFile(file: File, directory:string = "images"){
        const fileExtension = file.name.split('.').pop();
        const filePath = `/${directory}/${new Date().getTime()}.${fileExtension}`;
        const storageRef = ref(this.storage, filePath);
    
        return from(uploadBytes(storageRef, file))
            .pipe(
                take(1),
                switchMap(() => from(getDownloadURL(storageRef))),
            );
    }
    
    removeFile(filePath: string) {
        const storageRef = ref(this.storage, filePath);
        return from(deleteObject(storageRef))
            .pipe(take(1));
    }
}
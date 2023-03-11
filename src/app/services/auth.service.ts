import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { doc, getDoc } from "@firebase/firestore";

import { from, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private readonly fireStore: Firestore
    ) {}

    canActivateBy(adminCode: string) {
        return from(getDoc(
            doc(this.fireStore, 'adminCode', adminCode)
        ));
    }
}
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class PostRegisterHandlerService {

    private showPostRegister$ = new BehaviorSubject<boolean>(false);

    isOpened() {
        return this.showPostRegister$.asObservable();
    }

    open() {
        this.showPostRegister$.next(true);
    }

    close() {
        this.showPostRegister$.next(false);
    }
}
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ImageEffectService {

    imagePadeIn() {
        const imgEls = document.querySelectorAll('img');
        imgEls.forEach((img:any) => {
          img.addEventListener('load', () => {
            img.style.opacity = 1;
          });
        });
    }
}
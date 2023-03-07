import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalContainer } from "./modal.container";
import { ModalDirective } from "./modal.directive";

@NgModule({
    declarations: [
        ModalContainer,
        ModalDirective
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    exports: [
        ModalContainer
    ]
})
export class ModalModule { }
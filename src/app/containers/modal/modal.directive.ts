import { Directive, Input, OnChanges, SimpleChanges, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[content]',
})
export class ModalDirective implements OnChanges {
    
    @Input('content') component: any;

    constructor(
        private readonly viewContainerRef: ViewContainerRef
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.component) {
            this.viewContainerRef.clear();
            return;
        }

        this.viewContainerRef.createComponent(this.component);
    }
}
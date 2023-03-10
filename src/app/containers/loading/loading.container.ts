import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { LoadingService } from "src/app/services/UI/loading.service";

@Component({
    selector:'app-loading',
    template: `
    <div class="w-full p-6 md:px-10 z-50 absolute left-0 top-0 h-[100%]" *ngIf="loading$|async">
        <div id="loading-view" class="h-full pt-10">
            <div class="loading-view-item-1 p-1.5 my-4 rounded-lg w-[60%] h-[40px] animate-pulse"></div>
            <br/>
            <div class="loading-view-item-2 p-1.5 mb-4 rounded-lg w-[70%] animate-pulse"></div>
            <div class="loading-view-item-3 p-1.5 mb-4 rounded-lg w-[50%] animate-pulse"></div>
            <div class="loading-view-item-2 p-1.5 mb-4 rounded-lg w-[55%] animate-pulse"></div>
            <div class="loading-view-item-4 p-1.5 mb-4 rounded-lg w-[50%] animate-pulse"></div>
            <div class="loading-view-item-1 p-1.5 mb-4 rounded-lg w-[60%] animate-pulse"></div>
            <br/>
            <div class="loading-view-item-1 p-1.5 mb-4 rounded-lg w-[60%] animate-pulse"></div>
            <div class="loading-view-item-1 p-1.5 mb-10 rounded-lg w-[60%] animate-pulse"></div>
            <div class="loading-view-item-2 p-1.5 mb-4 rounded-lg w-[70%] animate-pulse"></div>
            <div class="loading-view-item-3 p-1.5 mb-4 rounded-lg w-[50%] animate-pulse"></div>
            <div class="loading-view-item-2 p-1.5 mb-4 rounded-lg w-[55%] animate-pulse"></div>
            <br/>
            <div class="loading-view-item-4 p-1.5 mb-4 rounded-lg w-[50%] animate-pulse"></div>
            <div class="loading-view-item-1 p-1.5 mb-4 rounded-lg w-[60%] animate-pulse"></div>
            <div class="loading-view-item-1 p-1.5 mb-4 rounded-lg w-[60%] animate-pulse"></div>
            <div class="loading-view-item-4 p-1.5 mb-4 rounded-lg w-[40%] animate-pulse"></div>
            <div class="loading-view-item-2 p-1.5 mb-4 rounded-lg w-[70%] animate-pulse"></div>
            <div class="loading-view-item-3 p-1.5 mb-4 rounded-lg w-[50%] animate-pulse"></div>
            <br/>
            <div class="loading-view-item-2 p-1.5 mb-4 rounded-lg w-[55%] animate-pulse"></div>
            <div class="loading-view-item-4 p-1.5 mb-4 rounded-lg w-[50%] animate-pulse"></div>
            <div class="loading-view-item-1 p-1.5 mb-4 rounded-lg w-[60%] animate-pulse"></div>
            <div class="loading-view-item-1 p-1.5 mb-4 rounded-lg w-[60%] animate-pulse"></div>
        </div>
    </div>
    `,
    standalone:true,
    imports: [
        CommonModule
    ]
})
export class LoadingContainer implements OnInit{

    loading$!:Observable<boolean>;

    constructor(
        private readonly loadingService: LoadingService
    ) {}

    ngOnInit(): void {
        this.loading$ = this.loadingService.isLoading();
    }

}

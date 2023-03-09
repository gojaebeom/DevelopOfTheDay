import { Injectable } from "@angular/core";
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, orderBy, query, updateDoc } from "@angular/fire/firestore";

import { collection, Timestamp } from "@firebase/firestore";

import { from, map, shareReplay, take } from "rxjs";
import { LoadingService } from "./UI/loading.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private readonly fireStore: Firestore,
        private readonly loadingService: LoadingService
    ) {  }

    getCategories(sortDto:ICategorySort = {column: 'createdAt', sort: 'desc'}) {
        const results$ = collectionData(
            query(
                collection(this.fireStore, 'categories'), 
                orderBy(sortDto.column, sortDto.sort)
            ), 
            { idField: 'id'}
        )
        .pipe(
            shareReplay(),
            map(res => <ICategory[]>res)
        )

        return this.loadingService.showLoaderUntilCompletedBy(results$);
    }

    getCategory(id: string) {
        const result$ = docData(
            doc(this.fireStore, 'categories', id), {
                idField: 'id'
            }
        )
        .pipe(
            map(res => <ICategory>res)
        );

        return this.loadingService.showLoaderUntilCompletedBy(result$);
    }

    createCategory(title: string) {
        const createdAt = Timestamp.now();
        const result$ = from(addDoc(collection(this.fireStore, 'categories'), { title, createdAt }))
            .pipe(
                take(1)
            );
        return this.loadingService.showLoaderUntilCompletedBy(result$);
    }

    updateCategory(category: ICategory) {
        const result$ = from(updateDoc(doc(this.fireStore, 'categories', category.id), {  
            title: category.title,
            createdAt: category.createdAt
        }))
            .pipe(
                take(1)
            );
        return this.loadingService.showLoaderUntilCompletedBy(result$);
    }

    deleteCategory(id: string) {
        const result$ = from(deleteDoc(doc(this.fireStore, 'categories', id)))
            .pipe(
                take(1)
            );

        return this.loadingService.showLoaderUntilCompletedBy(result$);
    }
}

export interface ICategory {
    id: string;
    title: string;
    createdAt: Timestamp;
}

export interface ICategorySort {
    column: 'title'|'createdAt';
    sort: 'desc'|'asc';
}
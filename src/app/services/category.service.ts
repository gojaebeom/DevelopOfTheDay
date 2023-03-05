import { Injectable } from "@angular/core";
import { addDoc, collectionData, deleteDoc, doc, Firestore, orderBy, query, updateDoc } from "@angular/fire/firestore";

import { collection, Timestamp } from "@firebase/firestore";

import { BehaviorSubject, from, shareReplay, take, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categories$ = new BehaviorSubject<ICategory[]>([]);

    constructor(
        private readonly fireStore: Firestore
    ) {  }

    getCategories(sortDto:ICategorySort = {column: 'createdAt', sort: 'desc'}) {
        collectionData(
            query(
                collection(this.fireStore, 'categories'), 
                orderBy(sortDto.column, sortDto.sort)
            ), 
            { idField: 'id'}
        )
        .pipe(
            shareReplay(),
            tap(() => console.log('firebase get categories!')),
            tap(res => this.categories$.next(<ICategory[]>res))
        )
        .subscribe();

        return this.categories$.asObservable();
    }

    createCategory(title: string) {
        const createdAt = Timestamp.now();
        return from(addDoc(collection(this.fireStore, 'categories'), { title, createdAt }))
            .pipe(
                take(1)
            );
    }

    updateCategory(category: ICategory) {
        return from(updateDoc(doc(this.fireStore, 'categories', category.id), {  
            title: category.title,
            createdAt: category.createdAt
        }))
            .pipe(
                take(1)
            );
    }

    deleteCategory(id: string) {
        return from(deleteDoc(doc(this.fireStore, 'categories', id)))
            .pipe(
                take(1)
            );
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
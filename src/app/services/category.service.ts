import { Injectable } from "@angular/core";
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, DocumentData, Firestore, orderBy, query, updateDoc } from "@angular/fire/firestore";

import { collection, Timestamp } from "@firebase/firestore";

import { BehaviorSubject, from, map, of, shareReplay, switchMap, take, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categories$ = new BehaviorSubject<ICategory[]>([]);

    constructor(
        private readonly fireStore: Firestore
    ) { }

    initCategories(sortDto:ICategorySort = {column: 'createdAt', sort: 'desc'}) {
        return collectionData(query(collection(this.fireStore, 'categories'), orderBy(sortDto.column, sortDto.sort)), { idField: 'id'})
        .pipe(
            shareReplay(),
            tap(res => {
                this.categories$.next(<ICategory[]>res);
            })
        );
    }

    getCategories() {
        return this.categories$.asObservable();
    }

    createCategory(title: string) {
        const createdAt = Timestamp.now();
        return of(addDoc(collection(this.fireStore, 'categories'), { title, createdAt }))
            .pipe(
                take(1)
            );
    }

    updateCategory(category: ICategory) {
        return of(updateDoc(doc(this.fireStore, 'categories', category.id), {  
            title: category.title,
            createdAt: category.createdAt
        }))
            .pipe(
                take(1)
            );
    }

    deleteCategory(id: string) {
        return of(deleteDoc(doc(this.fireStore, 'categories', id)))
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
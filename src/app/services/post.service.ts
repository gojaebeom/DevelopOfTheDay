import { Injectable } from "@angular/core";
import { collectionData, Firestore, orderBy, query, Timestamp } from "@angular/fire/firestore";
import { collection } from "@firebase/firestore";

import { BehaviorSubject, from, shareReplay, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private posts$ = new BehaviorSubject<IPost[]>([]);

    constructor(
        private readonly fireStore: Firestore
    ) { }

    getAllPosts(sortDto: IPostSort = { column: 'createdAt', sort: 'desc'}) {
        collectionData(
            query(
                collection(this.fireStore, 'posts'), 
                orderBy(sortDto.column, sortDto.sort)
            ), 
            {idField: 'id'}
        )
        .pipe(
            shareReplay(),
            tap(() => console.log('firebase get posts!')),
            tap(res => this.posts$.next(<IPost[]>res))
        )
        .subscribe();
        
        return this.posts$.asObservable();
    }
}

export interface IPost {
    id: string;
    categoryId: string;
    title: string;
    content: string;
    description: string;
    markDownURL: string;
    createdAt: Timestamp;
}

export interface IPostSort {
    column: 'title'|'createdAt';
    sort: 'desc'|'asc';
}
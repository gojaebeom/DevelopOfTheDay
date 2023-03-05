import { Injectable } from "@angular/core";
import { collectionData, CollectionReference, DocumentData, Firestore, orderBy, query, Timestamp } from "@angular/fire/firestore";
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

    initPosts(sortDto: IPostSort = { column: 'createdAt', sort: 'desc'}) {
        return from(collectionData(query(collection(this.fireStore, 'posts'), orderBy(sortDto.column, sortDto.sort))))
            .pipe(
                shareReplay(),
                tap(res => {
                    this.posts$.next(<IPost[]>res);
                })
            )
    }

    getPosts() {
        return this.posts$.asObservable();
    }
}

export interface IPost {
    id: string;
    categoryId: string;
    title: string;
    description: string;
    markDownURL: string;
    createdAt: Timestamp;
}

export interface IPostSort {
    column: 'title'|'createdAt';
    sort: 'desc'|'asc';
}
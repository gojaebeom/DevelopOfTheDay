import { Injectable } from "@angular/core";
import { addDoc, collectionData, Firestore, orderBy, query, Timestamp } from "@angular/fire/firestore";
import { collection } from "@firebase/firestore";

import { BehaviorSubject, from, shareReplay, take, tap } from "rxjs";

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

    create(post: Partial<IPost>) {
        const result = {
            categoryId: post.categoryId,
            title: post.title,
            description: post.description,
            content: post.content,
            createdAt: Timestamp.now()
        };
        return from(
            addDoc(
                collection(this.fireStore, 'posts'), 
                result
            )
        )
        .pipe(take(1));
    }
}

export interface IPost {
    id: string;
    categoryId: string;
    title: string;
    content: string;
    description: string;
    createdAt: Timestamp;
}

export interface IPostSort {
    column: 'title'|'createdAt';
    sort: 'desc'|'asc';
}
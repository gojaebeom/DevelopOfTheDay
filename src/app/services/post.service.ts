import { Injectable } from "@angular/core";
import { addDoc, collectionData, Firestore, orderBy, query, Timestamp } from "@angular/fire/firestore";
import { collection } from "@firebase/firestore";

import { BehaviorSubject, from, map, shareReplay, take, tap } from "rxjs";

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

    create(post: Omit<IPost, 'id'|'createdAt'>) {
        const result = <Omit<IPost, 'id'>>{
            ...post,
            createdAt: Timestamp.now()
        };
        return from(
            addDoc(
                collection(this.fireStore, 'posts'), 
                result
            )
        )
        .pipe(
            take(1),
            map((res) => res.id)
        );
    }
}

export interface IPost {
    id: string;
    categoryId: string;
    title: string;
    content: string;
    createdAt: Timestamp;
}

export interface IPostSort {
    column: 'title'|'createdAt';
    sort: 'desc'|'asc';
}
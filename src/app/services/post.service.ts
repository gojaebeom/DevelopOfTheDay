import { Injectable } from "@angular/core";
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, limit, orderBy, query, Timestamp, updateDoc } from "@angular/fire/firestore";
import { collection, CollectionReference, DocumentData } from "@firebase/firestore";

import { BehaviorSubject, from, map, shareReplay, take, tap } from "rxjs";

import { ICategory } from "./category.service";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private posts$ = new BehaviorSubject<IPost[]>([]);

    postCollection!: CollectionReference<DocumentData>;

    constructor(
        private readonly fireStore: Firestore
    ) { 
        this.postCollection = collection(fireStore, 'posts');
    }

    getAllPosts(sortDto: IPostSort = { column: 'createdAt', sort: 'desc'}) {
        collectionData(
            query(
                this.postCollection, 
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

    getLatestPosts() {
        collectionData(
            query(
                this.postCollection, 
                orderBy('createdAt', 'desc'),
                limit(10),
            )
        )
        .pipe(
            shareReplay(),
            tap(res => this.posts$.next(<IPost[]>res))
        ).subscribe();

        return this.posts$.asObservable();
    }

    getPost(id: string) {
        return docData(doc(this.fireStore, 'posts', id), {idField: 'id'})
            .pipe(
                shareReplay(),
                map(res => <IPost>res)
            );
    }

    createPost(post: Omit<IPost, 'id'|'createdAt'>) {
        const result = <Omit<IPost, 'id'>>{
            ...post,
            createdAt: Timestamp.now()
        };
        return from(
            addDoc(
                this.postCollection, 
                result
            )
        )
        .pipe(
            take(1),
            map((res) => res.id)
        );
    }

    updatePost(post: IPost) {
        return from(
            updateDoc(
                doc(this.fireStore, 'posts', post.id), {
                    ...post
                }
            )
        );
    }

    deletePost(id: string) {
        return from(deleteDoc(doc(this.fireStore, 'posts', id)))
            .pipe(
                take(1)
            );
    }
}

export interface IPost {
    id: string;
    categoryId: string;
    title: string;
    description: string;
    content: string;
    createdAt: Timestamp;
}

export interface IPostSort {
    column: 'title'|'createdAt';
    sort: 'desc'|'asc';
}
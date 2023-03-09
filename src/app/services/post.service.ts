import { Injectable } from "@angular/core";
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, limit, orderBy, query, Timestamp, updateDoc, where } from "@angular/fire/firestore";

import { collection, CollectionReference, DocumentData } from "@firebase/firestore";

import { from, map, shareReplay, take, tap } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class PostService {

    postCollection!: CollectionReference<DocumentData>;

    constructor(
        private readonly fireStore: Firestore
    ) { 
        this.postCollection = collection(fireStore, 'posts');
    }

    getAllPosts(sortDto: IPostSort = { column: 'createdAt', sort: 'desc'}) {
        return collectionData(
            query(
                this.postCollection, 
                orderBy(sortDto.column, sortDto.sort)
            ), 
            {idField: 'id'}
        )
        .pipe(
            shareReplay(),
            tap(() => console.log('firebase get posts!')),
            map(res => <IPost[]>res)
        );
    }

    getLatestPosts() {
        return collectionData(
            query(
                this.postCollection, 
                orderBy('createdAt', 'desc'),
                limit(10),
            )
        )
        .pipe(
            shareReplay(),
            map(res => <IPost[]>res)
        );
    }

    getPostsBy(categoryId: string) {
        return collectionData(
            query(
                this.postCollection, 
                where('categoryId', '==', categoryId),
                orderBy('createdAt', 'desc'),
            )
        )
        .pipe(
            shareReplay(),
            map(res => <IPost[]>res)
        );
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
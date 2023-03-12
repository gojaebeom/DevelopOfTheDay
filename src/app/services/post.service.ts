import { Injectable } from "@angular/core";
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, limit, orderBy, query, Timestamp, updateDoc, where } from "@angular/fire/firestore";

import { collection, CollectionReference, DocumentData } from "@firebase/firestore";

import { from, map, shareReplay, take, tap } from "rxjs";
import { LoadingService } from "./UI/loading.service";


@Injectable({
    providedIn: 'root'
})
export class PostService {

    postCollection!: CollectionReference<DocumentData>;

    constructor(
        private readonly fireStore: Firestore,
        private readonly loadingService: LoadingService
    ) { 
        this.postCollection = collection(fireStore, 'posts');
    }

    getAllPosts(sortDto: IPostSort = { column: 'createdAt', sort: 'desc'}) {
        const results$ = collectionData(
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
        return this.loadingService.showLoaderUntilCompletedBy(results$);
    }

    getLatestPosts() {
        const results$ = collectionData(
            query(
                this.postCollection, 
                orderBy('createdAt', 'desc'),
                limit(10),
            ), {
                idField:'id'
            }
        )
        .pipe(
            shareReplay(),
            map(res => <IPost[]>res)
        );

        return this.loadingService.showLoaderUntilCompletedBy(results$);
    }

    getPostsBy(categoryId: string) {
        const obs$ = collectionData(
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
        return this.loadingService.showLoaderUntilCompletedBy(obs$);
    }

    getPost(id: string) {
        const obs$ =  docData(doc(this.fireStore, 'posts', id), {idField: 'id'})
            .pipe(
                shareReplay(),
                map(res => <IPost>res)
            );
        return this.loadingService.showLoaderUntilCompletedBy(obs$);
    }

    createPost(post: Omit<IPost, 'id'|'createdAt'>) {
        const result = <Omit<IPost, 'id'>>{
            ...post,
            createdAt: Timestamp.now()
        };
        const obs$ =  from(
            addDoc(
                this.postCollection, 
                result
            )
        )
        .pipe(
            take(1),
            map((res) => res.id)
        );
        return this.loadingService.showLoaderUntilCompletedBy(obs$);
    }

    updatePost(post: IPost) {
        const obs$ = from(
            updateDoc(
                doc(this.fireStore, 'posts', post.id), {
                    ...post
                }
            )
        );
        return this.loadingService.showLoaderUntilCompletedBy(obs$);
    }

    deletePost(id: string) {
        const obs$ =  from(deleteDoc(doc(this.fireStore, 'posts', id)))
            .pipe(
                take(1)
            );
        return this.loadingService.showLoaderUntilCompletedBy(obs$);
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
import { Injectable } from "@angular/core";
import { Timestamp } from "@angular/fire/firestore";
import { map, Observable, tap, zip } from "rxjs";

import { ICategory } from "./category.service";

import { IPost } from "./post.service";

@Injectable({
    providedIn: 'root'
})
export class PostCategoryService {

    getCategoryWithPosts(category$: Observable<ICategory>, posts$: Observable<IPost[]>) {
        return zip([
            category$, posts$
        ])
        .pipe(
            map(([category, posts]) => <ICategoryWithPosts>{
                category,
                posts
            })
        );
    }

    getPostWithCategory(post$:Observable<IPost>, categories$:Observable<ICategory[]>) {
        return zip([
            post$,
            categories$
        ])
        .pipe(
            map(([post, categories]) => <IPostWithCategory>{
                id: post.id,
                title: post.title,
                content: post.content,
                description: post.description,
                createdAt: post.createdAt,
                category: categories.find(category => category.id === post.categoryId)
            })
        );
    }

    getPostsWithCategory(posts$: Observable<IPost[]>, categories$: Observable<ICategory[]>) {
        return zip([
            posts$,
            categories$
        ])
        .pipe(
            map(([posts, categories]) => <IPostWithCategory[]>posts.map(post => {
                    return {
                      id: post.id,
                      title: post.title,
                      content: post.content,
                      description: post.description,
                      createdAt: post.createdAt,
                      category: categories.find(category => category.id === post.categoryId)
                    }
                })
            )
        )
    }
}
export interface ICategoryWithPosts {
    category:ICategory;
    posts: IPost[];
}

export interface IPostWithCategory {
    id: string;
    category: ICategory;
    title: string;
    description: string;
    content: string;
    createdAt: Timestamp;
}
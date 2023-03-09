import { Injectable } from "@angular/core";
import { Timestamp } from "@angular/fire/firestore";

import { ICategory } from "./category.service";

import { IPost } from "./post.service";

@Injectable({
    providedIn: 'root'
})
export class PostCategoryService {

    constructor() {}

    getPostsWithCategory(posts:IPost[], categories:ICategory[]) {
        return <IPostWithCategory[]>posts.map(post => {
            return {
              id: post.id,
              title: post.title,
              content: post.content,
              description: post.description,
              createdAt: post.createdAt,
              category: categories.find(category => category.id === post.categoryId)
            }
        });
    }
}


export interface IPostWithCategory {
    id: string;
    category: ICategory;
    title: string;
    description: string;
    content: string;
    createdAt: Timestamp;
}
export interface Post {
    id: string;
    title: string;
    content: string;
    author?: string;
    views: number;
    createdAt: string;
    isLiked: boolean;
    likes: number;
    numOfComments: number;
    thumbnail?: string;
}

export interface Comment {
    id: string;
    content: string;
    author?: string;
    createdAt: string;
}

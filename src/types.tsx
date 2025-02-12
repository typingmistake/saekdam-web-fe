export interface Post {
    id: string;
    title: string;
    content: string;
    author?: string;
    createdAt: string;
    isLiked: boolean;
    likes: number;
    numOfComments: number;
}

export interface Comment {
    id: string;
    content: string;
    author?: string;
    createdAt: string;
}

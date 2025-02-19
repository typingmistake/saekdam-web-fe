import { Link } from 'react-router-dom';
import { Post } from '../types';
import noImage from '@/assets/noImage.png';

interface PostListProps {
    posts: Post[];
    thumbnailUrls?: Record<string, string>;
}

interface PostCardProps {
    post: Post;
    thumbnailUrl?: string;
}

const PostCard = ({ post, thumbnailUrl }: PostCardProps) => {
    return (
        <Link to={`/post/${post.id}`}>
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6 cursor-pointer">
                <div className="flex gap-6">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={thumbnailUrl ?? noImage}
                            alt={'Thumbnail'}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
                            {post.title}
                            <span className="ml-2 text-blue-500">[{post.numOfComments}]</span>
                        </h3>
                        <div className="flex gap-4 text-sm text-gray-500">
                            <span>조회 {post.views ?? 0}</span>
                            <span>
                                {post.createdAt
                                    ? new Date(post.createdAt).toISOString().split('T')[0]
                                    : '-'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export function PostList({ posts, thumbnailUrls = {} }: PostListProps) {
    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    thumbnailUrl={post.thumbnail ? thumbnailUrls[post.thumbnail] : undefined}
                />
            ))}
            {(!posts || posts.length === 0) && (
                <div className="text-center py-12 text-gray-500 italic">게시물이 없습니다.</div>
            )}
        </div>
    );
}

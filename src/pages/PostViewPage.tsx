import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Heart, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchApi } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, Form, FormItem, FormMessage } from '@/components/ui/form';
import { CommentList } from '@/components/CommentList';
import { commentFormSchema } from '@/schemas';
import type { Post, Comment } from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import throttle from 'lodash/throttle';
import { KakaoShareButton } from '@/components/KakaoShareButton';

// --- Helper & Animation Variants ---
// 모듈로 연산 헬퍼 함수
const mod = (n: number, m: number) => ((n % m) + m) % m;

// 이미지 전환 애니메이션 Variants
const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
    }),
};

// --- LikeButton 컴포넌트 ---
// 아이콘은 isLiked 값에 따라 CSS 클래스로 색상을 지정합니다.
const LikeButton = ({
    isLiked,
    likes,
    isLoading,
    onLikeClick,
}: {
    isLiked: boolean;
    likes: number;
    isLoading: boolean;
    onLikeClick: () => void;
}) => {
    return (
        <Button variant="ghost" className="relative" onClick={onLikeClick} disabled={isLoading}>
            <motion.div
                animate={isLoading ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
            >
                <Heart
                    className={`h-4 w-4 mr-2 transition-colors duration-200 ${
                        isLiked ? 'text-red-500' : 'text-gray-600'
                    } ${isLoading ? 'opacity-50' : ''}`}
                />
            </motion.div>
            {likes}
        </Button>
    );
};

// --- ImageGallery 컴포넌트 ---
const ImageGallery = ({ images }: { images: string[] }) => {
    const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

    const paginate = (newDirection: number) => {
        setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    };

    if (!images || images.length === 0) return null;
    const index = mod(page, images.length);

    return (
        <div className="relative w-full h-64 md:h-96 my-4 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={page}
                    src={images[index]}
                    alt={`Post image ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                />
            </AnimatePresence>
            {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <button
                        className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 focus:outline-none"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 focus:outline-none"
                        onClick={() => paginate(1)}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}
        </div>
    );
};

// --- PostView 컴포넌트 ---
const PostView = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [showComment, setShowComment] = useState(true);
    const [isLikeLoading, setIsLikeLoading] = useState(false);
    const toast = useToast();
    // toast 객체를 안정화 (memoize)
    const stableToast = useMemo(() => toast, []);

    const form = useForm<z.infer<typeof commentFormSchema>>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: { content: '' },
    });

    // 게시글 및 이미지 URL 요청
    const fetchPost = useCallback(async () => {
        if (!id) return;

        try {
            const response = await fetchApi(`/posts/${id}`, {
                method: 'GET',
            });

            setPost({
                ...response,
                isLiked: response.liked,
                likes: Number(response.likes) || 0,
            });

            setComments(response.comments || []);

            if (response.imageIds?.length > 0) {
                const urls = await fetchApi('/storage/accessUrls', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(response.imageIds),
                });
                setImageUrls(urls);
            }
        } catch (error) {
            console.error('게시글 불러오기 실패:', error);
            stableToast.toast({
                title: '게시글을 불러오는데 실패했습니다.',
                variant: 'destructive',
            });
        }
    }, [id, stableToast]);

    useEffect(() => {
        fetchPost();
    }, []);

    const handlePostDelete = async () => {
        try {
            await fetchApi(`/posts/${id}`, { method: 'DELETE' });
            stableToast.toast({ title: '게시글이 삭제되었습니다.' });
            navigate('/board');
        } catch (error) {
            stableToast.toast({
                title: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
                variant: 'destructive',
            });
        }
    };

    // 좋아요 업데이트 함수 (API 호출 후 UI 업데이트)
    const likeUpdate = useCallback(async () => {
        if (!post || !id) return;

        // 기존 상태를 보존합니다.
        const previousPost = { ...post };

        try {
            const method = previousPost.isLiked ? 'DELETE' : 'POST';
            await fetchApi(`/posts/${id}/likes`, { method });

            setPost({
                ...previousPost,
                isLiked: !previousPost.isLiked,
                likes: previousPost.isLiked
                    ? Math.max(previousPost.likes - 1, 0)
                    : previousPost.likes + 1,
            });

            stableToast.toast({
                title: previousPost.isLiked ? '좋아요를 취소했습니다.' : '좋아요를 눌렀습니다.',
            });
        } catch (error) {
            stableToast.toast({
                title: error instanceof Error ? error.message : '좋아요 업데이트에 실패했습니다.',
                variant: 'destructive',
            });
        } finally {
            setIsLikeLoading(false);
        }
    }, [post, id, stableToast]);

    // --- 쓰로틀링 적용 ---
    // 여기서는 leading: false, trailing: true 옵션으로 1000ms 후에 호출
    const throttledLikeUpdateRef = useRef(
        throttle(() => {}, 1000, { leading: false, trailing: true }),
    );

    useEffect(() => {
        throttledLikeUpdateRef.current = throttle(
            () => {
                likeUpdate();
            },
            1000,
            { leading: false, trailing: true },
        );
        return () => {
            throttledLikeUpdateRef.current.cancel();
        };
    }, [likeUpdate]);

    const handleLikeUpdate = useCallback(() => {
        if (isLikeLoading) return;
        setIsLikeLoading(true);
        throttledLikeUpdateRef.current();
    }, [isLikeLoading]);

    // 댓글 작성 및 삭제 핸들러
    const handleCommentSubmit = async (values: z.infer<typeof commentFormSchema>) => {
        try {
            const response = await fetchApi('/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId: id, content: values.content }),
            });
            setComments((prev) => [...prev, response]);
            form.reset();
            stableToast.toast({ title: '댓글이 작성되었습니다.' });
        } catch (error) {
            stableToast.toast({
                title: '댓글 작성에 실패했습니다.',
                variant: 'destructive',
            });
        }
    };

    const handleCommentDelete = async (commentId: string) => {
        try {
            await fetchApi(`/comments/${commentId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            setComments((prev) => prev.filter((comment) => comment.id !== commentId));
            stableToast.toast({ title: '댓글이 삭제되었습니다.' });
        } catch (error) {
            stableToast.toast({
                title: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
                variant: 'destructive',
            });
        }
    };

    if (!post) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage
                                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${
                                        post.author ? post.author : '익명'
                                    }`}
                                />
                                <AvatarFallback>저자</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-lg">{post.title}</CardTitle>
                                <p className="text-sm text-gray-500">
                                    {post.author ?? '익명'} •{' '}
                                    {post.createdAt
                                        ? new Date(post.createdAt).toISOString().split('T')[0]
                                        : ''}
                                </p>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate(`/chat/${id}`)}>
                                    채팅하기
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handlePostDelete}
                                    className="text-destructive"
                                >
                                    삭제하기
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700">{post.content}</p>
                    <ImageGallery images={imageUrls} />
                </CardContent>
                <CardFooter>
                    <div className="flex space-x-4">
                        <LikeButton
                            isLiked={post.isLiked}
                            likes={post.likes}
                            isLoading={isLikeLoading}
                            onLikeClick={handleLikeUpdate}
                        />
                        <Button
                            variant="ghost"
                            className="text-gray-600"
                            onClick={() => setShowComment((prev) => !prev)}
                        >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {comments.length}
                        </Button>
                        <KakaoShareButton
                            title={post.title}
                            webUrl={`${window.location.origin}/post/${id}`}
                            imageUrl={imageUrls[0] || 'https://placehold.co/600x400'}
                            kakaoKey="b33e512d77393f09ca3345321df6b086"
                            social={{
                                likeCount: post.likes,
                                commentCount: comments.length,
                            }}
                        />
                    </div>
                </CardFooter>
            </Card>

            <Card className={showComment ? '' : 'hidden'}>
                <CardHeader>
                    <CardTitle className="text-lg">댓글 {comments.length}개</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleCommentSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="댓글을 입력하세요..."
                                                className="min-h-20"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button type="submit">댓글 작성</Button>
                            </div>
                        </form>
                    </Form>
                    <Separator className="my-4" />
                    <CommentList
                        comments={comments}
                        onDelete={handleCommentDelete}
                        onEdit={(id) => console.log('Edit comment:', id)}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

const PostViewPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <PostView />
        </motion.div>
    );
};

export default PostViewPage;

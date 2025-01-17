import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Heart, Share2, MoreVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';

const PostView = () => {
    const [comments, setComments] = useState([
        {
            id: 1,
            author: '김철수',
            content: '정말 좋은 글이네요!',
            timestamp: '2시간 전',
            likes: 5,
        },
        {
            id: 2,
            author: '이영희',
            content: '많이 배웠습니다. 감사합니다.',
            timestamp: '1시간 전',
            likes: 3,
        },
    ]);

    const { id } = useParams<{ id: string }>();

    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = () => {
        if (!newComment.trim()) return;

        const comment = {
            id: comments.length + 1,
            author: '사용자',
            content: newComment,
            timestamp: '방금 전',
            likes: 0,
        };

        setComments([...comments, comment]);
        setNewComment('');
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            {/* 게시글 */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage
                                    src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${id}`}
                                />
                                <AvatarFallback>저자</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-lg">
                                    게시글 제목입니다 {id}번 게시글입니다.
                                </CardTitle>
                                <p className="text-sm text-gray-500">홍길동 • 3시간 전</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700">
                        여기에 게시글 내용이 들어갑니다. {id}번 게시글입니다.
                    </p>
                </CardContent>
                <CardFooter>
                    <div className="flex space-x-4">
                        <Button variant="ghost" className="text-gray-600">
                            <Heart className="h-4 w-4 mr-2" />
                            128
                        </Button>
                        <Button variant="ghost" className="text-gray-600">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {comments.length}
                        </Button>
                        <Button variant="ghost" className="text-gray-600">
                            <Share2 className="h-4 w-4 mr-2" />
                            공유
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            {/* 댓글 섹션 */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">댓글 {comments.length}개</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* 댓글 입력 */}
                    <div className="space-y-2">
                        <Textarea
                            placeholder="댓글을 입력하세요..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-20"
                        />
                        <div className="flex justify-end">
                            <Button onClick={handleCommentSubmit}>댓글 작성</Button>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    {/* 댓글 목록 */}
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${comment.author}`}
                                            />
                                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{comment.author}</p>
                                            <p className="text-sm text-gray-500">
                                                {comment.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-gray-700 pl-10">{comment.content}</p>
                                <div className="flex items-center space-x-4 pl-10"></div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PostView;

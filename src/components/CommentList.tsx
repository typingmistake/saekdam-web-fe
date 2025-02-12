import { Comment } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CommentListProps {
    comments: Comment[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

export const CommentList = ({ comments = [], onDelete, onEdit }: CommentListProps) => {
    return (
        <div className="space-y-4">
            {comments.length === 0 ? (
                <p className="text-gray-500 text-center">아직 댓글이 없습니다.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${
                                            comment.author ? comment.author : '익명'
                                        }`}
                                    />
                                    <AvatarFallback>{comment.author || '익명'}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{comment.author || '익명'}</p>
                                    <p className="text-sm text-gray-500">
                                        {comment.createdAt
                                            ? new Date(comment.createdAt)
                                                  .toISOString()
                                                  .split('T')[0]
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
                                    <DropdownMenuItem onClick={() => onEdit(comment.id)}>
                                        수정하기
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => onDelete(comment.id)}
                                        className="text-destructive focus:text-destructive"
                                    >
                                        삭제하기
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <p className="text-gray-700 pl-10">{comment.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};

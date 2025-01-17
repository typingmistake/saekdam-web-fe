import { useEffect, useState } from 'react';
import { DataTable } from '@/components/Table';
import { Input } from '@/components/ui/input';
import { PaginationComponent } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { fetchApi } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface SelectSearchProps {
    className?: string;
}

function SelectSearch({ className }: SelectSearchProps) {
    return (
        <Select>
            <SelectTrigger className={`${className}`}>
                <SelectValue placeholder="제목/내용" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>선택</SelectLabel>
                    <SelectItem value="apple">제목</SelectItem>
                    <SelectItem value="banana">내용</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
const getPostData = async (currentPage: number): Promise<Board> => {
    const response = await fetchApi(`/api/posts?page=${currentPage - 1}`, { method: 'GET' });
    return response;
};

export type Board = {
    content: Post[];
    totalPages: number;
};

export type Post = {
    id: string;
    title: string;
    views?: number;
    author?: string;
    createdAt?: string;
    numOfComments?: number;
    numOfRecommendations?: number;
};

const columns: ColumnDef<Post>[] = [
    {
        accessorKey: 'title',
        header: '제목',
    },
    {
        accessorKey: 'views',
        header: '조회수',
        cell: (cell) => {
            return cell.row.original.views ?? 0;
        },
    },
    {
        accessorKey: 'numOfComments',
        header: '댓글수',
        cell: (cell) => {
            return cell.row.original.numOfComments ?? 0;
        },
    },
    {
        accessorKey: 'author',
        header: '작성자',
        cell: (cell) => {
            return cell.row.original.author ?? '-';
        },
    },
    {
        accessorKey: 'createdAt',
        header: '작성일',
        cell: (cell) => {
            return cell.row.original.createdAt
                ? new Date(cell.row.original.createdAt).toISOString().split('T')[0]
                : '-';
        },
    },
];

const BoardPage = () => {
    const [data, setData] = useState<Board>();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPostData(currentPage);
                setData(result);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // URL 업데이트
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('page', page.toString());
        window.history.pushState({}, '', newUrl);
    };

    return (
        <div className="max-w-5xl mx-auto p-8 space-y-4">
            <DataTable<Post, string> columns={columns} data={data?.content ?? []} />
            <div className="flex space-x-2 items-center justify-end">
                <SelectSearch className="w-28" />
                <Input className="w-64" placeholder="검색어를 입력하세요" />
                <Button>검색</Button>
            </div>
            <PaginationComponent
                totalPages={data?.totalPages ?? 1}
                currentPage={currentPage}
                onPageChange={(page) => handlePageChange(page)}
            />
        </div>
    );
};

export default BoardPage;

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/Table';
import { Input } from '@/components/ui/input';
import { PaginationComponent } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
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

function SelectSearch() {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
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
const getPostData = async (): Promise<Post[]> => {
    const response = await fetchApi('/api/posts', {
        method: 'GET',
    });
    return response.content;
};

import { ColumnDef } from '@tanstack/react-table';

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
            return cell.row.original.createdAt ?? '-';
        },
    },
];

const BoardPage = () => {
    const [data, setData] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getPostData();
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-8 space-y-4">
            <DataTable<Post, string> columns={columns} data={data} />
            <div className="flex space-x-2 items-center justify-end">
                <SelectSearch></SelectSearch>
                <Input className="w-64" placeholder="검색어를 입력하세요" />
                <Button>검색</Button>
            </div>
            <PaginationComponent />
        </div>
    );
};

export default BoardPage;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from '@/components/PostTable';
import { PostList, Post } from '@/components/PostList';
import { Input } from '@/components/ui/input';
import { PaginationComponent } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { fetchApi } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Search, LayoutList, TableProperties } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Board = {
    content: Post[];
    totalPages: number;
    totalElements: number;
};

type ThumbnailUrls = {
    [key: string]: string;
};

const columns: ColumnDef<Post>[] = [
    {
        accessorKey: 'title',
        header: '제목',
        cell: (cell) => (
            <div className="font-medium hover:text-blue-600 transition-colors">
                {cell.row.original.title}
                <span className="ml-2 text-blue-500">[{cell.row.original.numOfComments}]</span>
            </div>
        ),
    },
    {
        accessorKey: 'views',
        header: 'hit',
        cell: (cell) => <div className="text-gray-600">{cell.row.original.views ?? 0}</div>,
    },
    {
        accessorKey: 'createdAt',
        header: '작성일',
        cell: (cell) => (
            <div className="text-gray-600">
                {cell.row.original.createdAt
                    ? new Date(cell.row.original.createdAt).toISOString().split('T')[0]
                    : '-'}
            </div>
        ),
    },
];

const getPostData = async (currentPage: number): Promise<Board> => {
    const response = await fetchApi(`/posts?page=${currentPage - 1}`, { method: 'GET' });
    return response;
};

const BoardPage = () => {
    const [data, setData] = useState<Board>();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('title');
    const [viewMode, setViewMode] = useState<'table' | 'list'>('table');
    const [thumbnailUrls, setThumbnailUrls] = useState<ThumbnailUrls>({});

    const getThumbnailUrls = async (posts: Post[]) => {
        // 썸네일이 있는 게시물의 ID만 필터링
        const thumbnailIds = posts
            .filter((post) => post.thumbnail !== null)
            .map((post) => post.thumbnail as string);

        if (thumbnailIds.length === 0) return {};

        try {
            const response = await fetchApi('/storage/accessUrls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(thumbnailIds),
            });

            const urlMap: ThumbnailUrls = {};
            thumbnailIds.forEach((id, index) => {
                urlMap[id] = response[index];
            });

            return urlMap;
        } catch (error) {
            console.error('Error fetching thumbnail URLs:', error);
            return {};
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getPostData(currentPage);
                setData(result);

                // 게시물 데이터를 가져온 후 썸네일 URL 요청
                const urls = await getThumbnailUrls(result.content);
                setThumbnailUrls(urls);
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                } else {
                    alert('게시물을 불러오는 중 오류가 발생했습니다.');
                }
            }
        };
        fetchData();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('page', page.toString());
        window.history.pushState({}, '', newUrl);
    };

    const handleSearch = async () => {
        if (searchTerm.length < 2) {
            alert('검색어는 2글자 이상이어야 합니다.');
            return;
        }
        try {
            const response = await fetchApi(
                `/posts/search/${searchType}?${searchType}=${searchTerm}`,
                { method: 'GET' },
            );

            setData({
                ...data,
                content: response,
                totalElements: response.length,
                totalPages: data?.totalPages ?? 1,
            });

            // 검색 결과에 대한 썸네일 URL도 가져오기
            const urls = await getThumbnailUrls(response);
            setThumbnailUrls(urls);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('검색 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50"
        >
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">게시판</h1>
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={() => setViewMode(viewMode === 'table' ? 'list' : 'table')}
                            className="gap-2"
                        >
                            {viewMode === 'table' ? (
                                <>
                                    <LayoutList className="w-4 h-4" />
                                    카드 보기
                                </>
                            ) : (
                                <>
                                    <TableProperties className="w-4 h-4" />
                                    테이블 보기
                                </>
                            )}
                        </Button>
                        <Link to="/board/write">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                게시물 작성
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Search Section */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Select value={searchType} onValueChange={setSearchType}>
                            <SelectTrigger className="w-full sm:w-32">
                                <SelectValue placeholder="검색 유형" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>검색 옵션</SelectLabel>
                                    <SelectItem value="title">제목</SelectItem>
                                    <SelectItem value="content">내용</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="flex-1 relative">
                            <Input
                                className="w-full pl-10"
                                placeholder="검색어를 입력하세요"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                        <Button
                            className="bg-gray-900 hover:bg-gray-800 text-white px-8"
                            onClick={handleSearch}
                        >
                            검색
                        </Button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {viewMode === 'table' ? (
                        <DataTable
                            columns={columns}
                            data={data?.content ?? []}
                            totalElements={data?.totalElements ?? 0}
                            thumbnailUrls={thumbnailUrls}
                        />
                    ) : (
                        <PostList posts={data?.content ?? []} thumbnailUrls={thumbnailUrls} />
                    )}
                </div>

                {/* Pagination Section */}
                <div className="mt-6 flex justify-center">
                    <PaginationComponent
                        totalPages={data?.totalPages ?? 1}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default BoardPage;

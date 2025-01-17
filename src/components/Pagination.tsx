import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

// 컴포넌트 props 인터페이스를 외부로 이동
interface PaginationComponentProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
    maxDisplayPages?: number;
}

export function PaginationComponent({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    maxDisplayPages = 5,
}: PaginationComponentProps) {
    // 페이지 범위 계산
    const getPageRange = () => {
        let start = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2));
        let end = Math.min(totalPages, start + maxDisplayPages - 1);

        // 시작 페이지 재조정
        if (end - start + 1 < maxDisplayPages) {
            start = Math.max(1, end - maxDisplayPages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const pages = getPageRange();

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* 이전 페이지 버튼 */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                        }}
                        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>

                {/* 첫 페이지가 보이지 않을 때 표시 */}
                {pages[0] > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(1);
                                }}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {pages[0] > 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </>
                )}

                {/* 페이지 번호 */}
                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* 마지막 페이지가 보이지 않을 때 표시 */}
                {pages[pages.length - 1] < totalPages && (
                    <>
                        {pages[pages.length - 1] < totalPages - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(totalPages);
                                }}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {/* 다음 페이지 버튼 */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                        }}
                        className={
                            currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from '@/components/ui/table';
import { Post } from './PostList';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    totalElements?: number;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    totalElements,
}: DataTableProps<TData, TValue>) {
    const navigate = useNavigate();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            <TableHead className="w-20"></TableHead>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="px-3 py-3 text-left text-sm font-semibold text-gray-900 first:rounded-tl-lg last:rounded-tr-lg"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                                className="group transition-colors hover:bg-gray-50 cursor-pointer border-t border-gray-200"
                                onClick={() => navigate(`/post/${(row.original as Post).id}`)}
                            >
                                <TableCell className="w-20 p-3">
                                    <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src="/src/assets/logo.svg"
                                            alt="Post thumbnail"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </TableCell>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="px-3 py-3 text-[11px] sm:text-sm md:text-sm text-gray-700 group-hover:text-gray-900 break-keep"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length + 1}
                                className="h-24 text-center text-gray-500 italic"
                            >
                                게시물이 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell
                            colSpan={columns.length + 1}
                            className="px-3 py-3 text-right text-sm font-medium text-gray-700 border-t border-gray-200"
                        >
                            총 {totalElements}개의 게시물이 있습니다.
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}

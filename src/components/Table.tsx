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
import { Post } from '@/pages/BoardPage';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const navigate = useNavigate();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-lg border border-gray-200 shadow-sm">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-900 first:rounded-tl-lg last:rounded-tr-lg"
                                        style={{
                                            width: header.column.id === 'title' ? '50%' : 'auto',
                                        }}
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
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="px-6 py-4 text-sm text-gray-700 group-hover:text-gray-900"
                                        style={{
                                            width:
                                                cell.column.columnDef.header === 'title'
                                                    ? '50%'
                                                    : 'auto',
                                        }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-32 text-center text-gray-500 italic"
                            >
                                게시물이 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="px-6 py-4 text-right text-sm font-medium text-gray-700 border-t border-gray-200"
                        >
                            총 게시물 수: {table.getRowModel().rows.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}

// components/ui/data-table.tsx
'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

interface ColumnDef<T> {
  header: string
  accessor: keyof T
  cell?: (value: any, row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  className?: string
  onRowClick?: (row: T) => void
}

export function DataTable<T>({
  data,
  columns,
  className,
}: DataTableProps<T>) {
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data && data.length === 0) ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center text-blue-600 text-lg">
                No Data
              </TableCell>
            </TableRow>
          ) : (
            data?.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="cursor-pointer hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className={column.className}>
                    {column.cell
                      ? column.cell(row[column.accessor], row)
                      : String(row[column.accessor])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}

        </TableBody>
      </Table>
    </div>
  )
}
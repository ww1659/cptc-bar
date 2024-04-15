"use client";
import * as React from "react";
import { formatInTimeZone } from "date-fns-tz";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { SalesDatePicker } from "./DatePicker";
import { formatAsCurrency } from "@/utils/helperFunctions";
import { SaleItem } from "@/interfaces/Sale";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ paymentMethod: false, saleItems: false });
  const [rowSelection, setRowSelection] = React.useState({});
  const [expanded, setExpanded] = React.useState({});
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
    },
  });

  React.useEffect(() => {
    if (selectedDate) {
      const filterDateString = formatInTimeZone(
        selectedDate,
        "Europe/London",
        "yyyy-MM-dd"
      );
      table.getColumn("createdAt")?.setFilterValue(filterDateString);
    }
  }, [selectedDate, table]);

  return (
    <div>
      <div className="flex items-center py-4">
        <SalesDatePicker date={selectedDate} setDate={setSelectedDate} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Select Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                if (column.id !== "saleItems") {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                }
                return null;
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => {
                const saleItems: any = row.getAllCells()[7].getValue();
                return (
                  <>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() ? (
                      <TableRow
                        key={`${row.id}-expanded-header`}
                        className="border-0"
                      >
                        {table
                          .getVisibleFlatColumns()
                          .map((cell, index, self) => (
                            <TableCell
                              key={`${row.id}-${cell.id}-header`}
                              className={`${
                                index === self.length - 2 ? "text-right" : ""
                              }  py-1 text-xs font-bold`}
                            >
                              {index === self.length - 4
                                ? "Drink"
                                : index === self.length - 3
                                ? "Quantity"
                                : index === self.length - 2
                                ? "Price"
                                : null}
                            </TableCell>
                          ))}
                      </TableRow>
                    ) : null}
                    {row.getIsExpanded()
                      ? saleItems.map((saleItem: SaleItem) => (
                          <TableRow
                            key={`${row.id}-${saleItem.saleItemId}`}
                            className="border-0"
                          >
                            {table
                              .getVisibleFlatColumns()
                              .map((cell, index, self) => (
                                <TableCell
                                  key={`${row.id}-${saleItem.saleItemId}-${cell.id}`}
                                  className={`${
                                    index === self.length - 2
                                      ? "text-right"
                                      : ""
                                  } ${
                                    index === self.length - 4
                                      ? "text-green-800"
                                      : ""
                                  } py-1 text-xs`}
                                >
                                  {index === self.length - 4
                                    ? saleItem.name
                                    : index === self.length - 3
                                    ? saleItem.quantity
                                    : index === self.length - 2
                                    ? `£${formatAsCurrency(
                                        Number(saleItem.price) *
                                          saleItem.quantity
                                      )}`
                                    : null}
                                </TableCell>
                              ))}
                          </TableRow>
                        ))
                      : null}
                  </>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

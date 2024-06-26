"use client";
import * as React from "react";
import { format } from "date-fns";
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { SalesDatePicker } from "./DatePicker";
import { downloadSalesCsv, formatAsCurrency } from "@/utils/helperFunctions";
import { Sale, SaleItem } from "@/interfaces/Sale";
import { SignedIn } from "@clerk/nextjs";
import { DownloadIcon } from "lucide-react";
import { DataTablePagination } from "./DataTablePagination";
import useSWR from "swr";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  userRole: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  userRole,
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

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumnVisibility((currentState) => ({
          ...currentState,
          discount: false,
          expander: false,
          totalQuantity: false,
        }));
      } else {
        setColumnVisibility((currentState) => ({
          ...currentState,
          discount: true,
          expander: true,
          totalQuantity: true,
        }));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (userRole) {
      setColumnVisibility({
        ...columnVisibility,
        actions: userRole === "admin",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole]);

  const handleCSVClick = async (sales: Sale[], filename: string) => {
    try {
      downloadSalesCsv(sales, filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const selectedSales = table.getSelectedRowModel().rows;
  const csvSales = selectedSales.map((sale) => {
    return sale.original as Sale;
  });

  const currentMonth = format(new Date(), "yyyy-MM");
  const currentMonthDisplay = format(new Date(), "MMMM");
  const monthlySales = (data as Sale[]).filter((sale) => {
    const saleDate = format(sale.createdAt, "yyyy-MM");
    return saleDate === currentMonth;
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center py-4">
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
              .filter(
                (column) => column.getCanHide() && column.id !== "actions"
              )
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
        {userRole === "admin" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-green-800 text-white ml-2 p-3">
                <DownloadIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <div className="flex flex-row items-center">
                <DropdownMenuLabel>Export Sale Data</DropdownMenuLabel>
                <DropdownMenuShortcut className="mr-1">
                  .csv
                </DropdownMenuShortcut>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="m-0">
                  <Button
                    variant="ghost"
                    className="m-0 hover:bg-0 pl-0"
                    onClick={() => handleCSVClick(data as Sale[], "all")}
                  >
                    All sales
                  </Button>
                  <DropdownMenuShortcut>{data.length}</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="m-0">
                  <Button
                    variant="ghost"
                    className="m-0 hover:bg-0 pl-0"
                    onClick={() =>
                      handleCSVClick(
                        monthlySales as Sale[],
                        currentMonthDisplay.toLowerCase()
                      )
                    }
                  >
                    {currentMonthDisplay}
                  </Button>
                  <DropdownMenuShortcut>
                    {monthlySales.length}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="m-0">
                  <Button
                    variant="ghost"
                    className="m-0 hover:bg-0 pl-0"
                    onClick={() => handleCSVClick(csvSales, "selected")}
                    disabled={csvSales.length === 0 ? true : false}
                  >
                    Selected
                  </Button>
                  <DropdownMenuShortcut>{csvSales.length}</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-stone-100 hover:bg-0">
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
                      className="hover:bg-0 focus:bg-0"
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
                        className="border-0 bg-stone-100 hover:bg-stone-100"
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
                      ? saleItems.map(
                          (
                            saleItem: SaleItem,
                            index: number,
                            self: SaleItem[]
                          ) => (
                            <TableRow
                              key={`${row.id}-${saleItem.saleItemId}`}
                              className="bg-stone-100 hover:bg-stone-100"
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
                                    } py-2 text-xs`}
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
                          )
                        )
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
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

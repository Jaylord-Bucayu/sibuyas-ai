"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"

export const columns: ColumnDef<Task>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //       className="translate-y-[2px]"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //       className="translate-y-[2px]"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    // {
    //   accessorKey: "_id",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="ID" />
    //   ),
    //   cell: ({ row }) => <div className="w-[150px] truncate">{row.getValue("_id")}</div>,
    // },
    {
      accessorKey: "input",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Input Values" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate">{JSON.stringify(row.getValue("input"))}</div>
      ),
    },
    {
      accessorKey: "predictions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Predictions" />
      ),
      cell: ({ row }) => {
        const predictions:any = row.getValue("predictions");
        return (
          <div className="flex flex-col">
            <span>GOOD: {predictions.GOOD}</span>
            <span>BAD: {predictions.BAD}</span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "modelId.name",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Model Name" />
    //   ),
    //   cell: ({ row }) => <div>{row.getValue("modelId.name")}</div>,
    // },
    // {
    //   accessorKey: "projectId.name",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Project Name" />
    //   ),
    //   cell: ({ row }) => <div>{row.getValue("projectId.name")}</div>,
    // },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => <div>{new Date(row.getValue("createdAt")).toLocaleString()}</div>,
    },
    // {
    //   accessorKey: "updatedAt",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Updated At" />
    //   ),
    //   cell: ({ row }) => <div>{new Date(row.getValue("updatedAt")).toLocaleString()}</div>,
    // },
    // {
    //   id: "actions",
    //   cell: ({ row }) => <DataTableRowActions row={row} />,
    // },
  ];
  
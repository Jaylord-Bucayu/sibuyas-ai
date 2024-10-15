"use client"

import { Cross2Icon, FileIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { PredictionData, priorities, statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

import * as XLSX from "xlsx";

interface DataTableToolbarProps<TData ,PredictionData> {
  table: Table<TData>,
  data : PredictionData[]
}


export function DataTableToolbar<TData>({
  table,
  data
}: DataTableToolbarProps<TData,PredictionData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const onGetExporProduct =  (title?: string, worksheetname?: string) => {
    try {
      if (data && Array.isArray(data)) {
        const dataToExport = data.map((item:PredictionData) => {
          // Convert each input value to a separate column
          const inputColumns = item.input.reduce((acc, inputValue, index) => {
            //@ts-nocheck
            //@ts-ignore
            acc[`Input${index + 1}`] = inputValue;
            return acc;
          }, {});
  
          // Return a new object combining input columns with predictions and date
          return {
            ...inputColumns,
            Good: item.predictions.GOOD,
            Bad: item.predictions.BAD,
            date: item.createdAt,
          };
        });
  
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
  
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
      } else {
        console.log("#==================Export Error");
      }
    } catch (error: any) {
      console.log("#==================Export Error", error.message);
    }
  };

  
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">

         <Button variant={"secondary"} size={"sm"} className="font-medium flex gap-2"
         onClick={() => onGetExporProduct("OnionAi", "DataExport")}
         >
            <FileIcon/> Export CSV
          </Button> 

        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
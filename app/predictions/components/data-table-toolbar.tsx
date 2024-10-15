import { Cross2Icon, FileIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";

import { PredictionData, priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import * as XLSX from "xlsx";

// Ensure TData is constrained to PredictionData
interface DataTableToolbarProps<TData extends PredictionData> {
  table: Table<TData>;
  data: TData[]; // Ensure data is of type TData
}

export function DataTableToolbar<TData extends PredictionData>({
  table,
  data,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const onGetExportProduct = (
    data: TData[],
    title: string = 'Export',
    worksheetname: string = 'Sheet1'
  ): void => {
    try {
      if (data && Array.isArray(data)) {
        const dataToExport = data.map((item: TData) => {
          const inputColumns = item.input.reduce<Record<string, string | number>>(
            (acc, inputValue, index) => {
              acc[`Input${index + 1}`] = inputValue;
              return acc;
            },
            {}
          );

          return {
            ...inputColumns,
            Good: item.predictions.GOOD,
            Bad: item.predictions.BAD,
            Date: item.createdAt,
          };
        });

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);

        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
      } else {
        console.error("Export Error: Data is invalid or empty.");
      }
    } catch (error) {
      console.error("Export Error:", (error as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Button
          variant={"secondary"}
          size={"sm"}
          className="font-medium flex gap-2"
          onClick={() => onGetExportProduct(data, "OnionAi", "DataExport")}
        >
          <FileIcon /> Export CSV
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
  );
}

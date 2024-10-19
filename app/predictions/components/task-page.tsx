'use client'

import { useState } from "react"
import { DataTable } from "./data-table"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { PredictionData } from "../data/data"
import { DataChart } from "./data-chart"
import { ScrollArea } from "@/components/ui/scroll-area"
import React from "react"

interface TaskPageClientProps {
  tasks: PredictionData[]
  columns: any[]
}

export function TaskPageClient({ tasks, columns }: any) {
  const [selectedItem, setSelectedItem] = useState<PredictionData | null>(null)

  const handleSelectedItemChange = (item: any | null) => {
    setSelectedItem(item)
  }

  return (
    <div className="flex flex-col w-full h-screen p-2 md:flex-row">
    <div className="grid grid-cols-1 md:grid-cols-[3fr,2fr] gap-2 h-full w-full">
      <div className="overflow-hidden mb-4 md:mb-0">
        <ScrollArea className="h-[50vh] md:h-[95vh] py-2 px-4">
          <DataTable data={tasks} columns={columns} onSelectedItemChange={handleSelectedItemChange} />
        </ScrollArea>
      </div>
      <div className="overflow-hidden">
        <ScrollArea className="h-[50vh] md:h-[95vh] py-2">
          {selectedItem ? (
            <div className="p-4">
              <DataChart predictions={selectedItem.predictions}/>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 mt-4">
                <pre className="overflow-auto">
                  <code className="block whitespace-pre-wrap text-sm">
                    <span className="text-blue-400">scanned</span> values <span className="text-pink-400">=</span> [<br />
                    {selectedItem.input.map((value, index) => (
                      <React.Fragment key={index}>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">{value}</span>{index < selectedItem.input.length - 1 ? ',' : ''}<br />
                      </React.Fragment>
                    ))}
                    ];
                  </code>
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select an item to view details</p>
            </div>
            
          )}
        </ScrollArea>
      </div>
    </div>
  </div>
  )
}
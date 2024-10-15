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
    <div className="hidden h-screen flex-1 flex-col p-2 md:flex w-full">
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-10rem)]">
        <ResizablePanel defaultSize={80} className="p-4"  max-size={98}>
          <ScrollArea className="h-[95vh] py-2">
          <DataTable data={tasks} columns={columns} onSelectedItemChange={handleSelectedItemChange} />
          </ScrollArea>
          </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} max-size={30}>
        <ScrollArea className="h-[90vh] py-2">
          {selectedItem ? (
            <div className="p-4">
              {/* <h3 className="text-lg font-semibold mb-2">Selected Item Details</h3> */}
              {/* <p>ID: {selectedItem._id}</p> 
              <p>Input: {selectedItem.input}</p> */}
              {/* <p>Model ID: {selectedItem.modelId}</p>
              <p>Project ID: {selectedItem.projectId}</p> */}
              {/* <p>Created At: {new Date(selectedItem.createdAt).toLocaleString()}</p>
              <p>Updated At: {new Date(selectedItem.updatedAt).toLocaleString()}</p> */}
              
                <DataChart predictions={selectedItem.predictions}/>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4">
            <pre className="overflow-auto">
                <code className="block whitespace-pre-wrap">
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
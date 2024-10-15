import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import axios from "axios"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { taskSchema } from "./data/schema"

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

  

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}


import { getCurrentUser } from "@/lib/session"
import { TaskPageClient } from "./components/task-page"
import Header from "@/layout/header"

// Simulate a database read for tasks.
async function getTasks(user:any) {
    try {
        const response = await axios.get(
          `https://ai-projects-backend.onrender.com/api/v1/predictions?projectId=670d2f0319b02829ca94ab5d&sort=desc`,
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          }
        );
          console.log({user})
        return z.array(taskSchema).parse(response.data)
      } catch (error) {
        return error;
      }


}

export default async function TaskPage() {
    const user = await getCurrentUser()
     const tasks = await getTasks(user)


     
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="h-full flex-1 flex-col space-y-8 px-8">
       {/* <Header/> */}
         <TaskPageClient tasks={tasks} columns={columns} />
    
      </div>
    </>
  )
}
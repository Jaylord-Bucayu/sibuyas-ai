import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import axios from "axios"
import { columns } from "./components/columns"
import { taskSchema } from "./data/schema"  

export const metadata: Metadata = {
  title: "OnionGuard | Predictions",
  description: "Predictions of Onions",
}

import { getCurrentUser } from "@/lib/session"
import { TaskPageClient } from "./components/task-page"


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
     
      <div className="flex h-full flex-1 flex-col">
       {/* <Header/> */}
         <TaskPageClient tasks={tasks} columns={columns} />
    
      </div>
    </>
  )
}
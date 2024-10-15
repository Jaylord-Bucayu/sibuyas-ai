import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  _id: z.string(),
  input: z.array(z.number()),
  predictions: z.object({
    BAD: z.string(),
    GOOD: z.string(),
  }),
  modelId: z.object({
    name: z.string(),
  }),
  projectId: z.object({
    _id: z.string(),
    name: z.string(),
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Task = z.infer<typeof taskSchema>
import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel } from "./index"

export const NoteModel = z.object({
  id: z.string().optional(),
  title: z.string(),
  body: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string().optional(),
})

export interface CompleteNote extends z.infer<typeof NoteModel> {
  user: CompleteUser
}

/**
 * RelatedNoteModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedNoteModel: z.ZodSchema<CompleteNote> = z.lazy(() => NoteModel.extend({
  user: RelatedUserModel,
}))

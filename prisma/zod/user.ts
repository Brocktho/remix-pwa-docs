import * as z from "zod"
import * as imports from "../null"
import { CompletePassword, RelatedPasswordModel, CompleteNote, RelatedNoteModel, CompleteListItems, RelatedListItemsModel } from "./index"

export const UserModel = z.object({
  id: z.string().optional(),
  email: z.string(),
  avatar: z.string().optional(),
  theme: z.string(),
  lastLogin: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  password?: CompletePassword | null
  notes: CompleteNote[]
  items: CompleteListItems[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  password: RelatedPasswordModel.nullish(),
  notes: RelatedNoteModel.array(),
  items: RelatedListItemsModel.array(),
}))

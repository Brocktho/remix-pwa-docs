import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel } from "./index"

export const ListItemsModel = z.object({
  id: z.number().int().optional(),
  cuid: z.string().optional(),
  item: z.string(),
  softDelete: z.boolean().optional(),
  lastPurchased: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string().optional(),
})

export interface CompleteListItems extends z.infer<typeof ListItemsModel> {
  user: CompleteUser
}

/**
 * RelatedListItemsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedListItemsModel: z.ZodSchema<CompleteListItems> = z.lazy(() => ListItemsModel.extend({
  user: RelatedUserModel,
}))

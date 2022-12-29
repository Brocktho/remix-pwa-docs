import { prisma } from "~/db.server";

import type * as z from "zod";
import type { ListItemsModel } from "prisma/zod";
import type { ListItems, User } from "@prisma/client";

export type { ListItems } from "@prisma/client";

//Prisma is great, lets us preform authenticated actions through how we update or create objects.

export const GetListItems = async (id: User["id"]) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      items: true,
    },
  });
};

export const CreateListItem = async (
  data: z.infer<typeof ListItemsModel>,
  id: User["id"]
) => {
  return await prisma.user.update({
    where: { id },
    data: {
      items: {
        create: {
          ...data,
        },
      },
    },
  });
};

export const UpdateListItem = async (
  data: z.infer<typeof ListItemsModel>,
  id: User["id"]
) => {
  return await prisma.user.update({
    where: { id },
    data: {
      items: {
        update: {
          where: { cuid: data.cuid },
          data,
        },
      },
    },
  });
};

export const SoftDeleteListItem = async (
  cuid: ListItems["cuid"],
  id: User["id"]
) => {
  return await prisma.user.update({
    where: { id },
    data: {
      items: {
        update: {
          where: { cuid },
          data: {
            softDelete: true,
          },
        },
      },
    },
  });
};

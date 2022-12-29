-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListItems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cuid" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "softDelete" BOOLEAN NOT NULL DEFAULT false,
    "lastPurchased" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ListItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ListItems" ("createdAt", "cuid", "id", "item", "lastPurchased", "updatedAt", "userId") SELECT "createdAt", "cuid", "id", "item", "lastPurchased", "updatedAt", "userId" FROM "ListItems";
DROP TABLE "ListItems";
ALTER TABLE "new_ListItems" RENAME TO "ListItems";
CREATE UNIQUE INDEX "ListItems_cuid_key" ON "ListItems"("cuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

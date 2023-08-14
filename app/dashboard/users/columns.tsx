"use client";

import { Podcaster, User } from "@/types";
import { CellContext, ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface CType extends CellContext<Podcaster, unknown> {
  onDelete: (userId: string) => void;
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "first_name",
    header: "Name",
  },
  // {
  //   accessorKey: "last_name",
  //   header: "Last Name",
  // },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Status",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ onDelete, row }: CellContext<User, unknown> | any) => {
      const user = row.original;

      return (
        <Button
          onClick={() => onDelete(user.id)}
          variant={"destructive"}
          size={"sm"}
        >
          Delete
        </Button>
      );
    },
  },
];

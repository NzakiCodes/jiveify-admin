"use client";

import { Podcaster } from "@/types";
import { CellContext, ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface CType extends CellContext<Podcaster, unknown> {
  onDelete: (podcastId: string) => void;
}

export const columns: ColumnDef<Podcaster>[] = [
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
    accessorKey: "fullname",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalPodcast",
    header: "Podcasts",
  },
  {
    accessorKey: "subscription",
    header: "Plan",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ onDelete, row }: CellContext<Podcaster, unknown> | any) => {
      const podcaster = row.original;

      return (
        <Button
          onClick={() => onDelete(podcaster.user_id)}
          variant={"destructive"}
          size={"sm"}
        >
          Delete
        </Button>
      );
    },
  },
];

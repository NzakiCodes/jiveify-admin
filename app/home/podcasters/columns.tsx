"use client"
 
import { Podcaster } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<Podcaster>[]= [
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
        accessorKey:"fullname",
        header:"Name"
    },
    {
        accessorKey:"status",
        header:"Status",
    },
    {
        accessorKey:"totalPodcast",
        header:"Podcasts",
    },
    {
        accessorKey:"subscription",
        header:"Plan",
    },
    {
        id: "actions",
        header:"Action",
        cell: ({ row }) => {
          const podcaster = row.original
     
          return (
            <Button variant={"destructive"} size={"sm"}>Delete</Button>
          )
        },
      },
    
]
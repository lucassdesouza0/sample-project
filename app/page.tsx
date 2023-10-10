"use client";
import { useUsers } from "./hooks/useUsers";
import { useRouter } from "next/navigation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Users } from "./types/users";
import { memo, useEffect } from "react";
import Link from "next/link";

function IndexPage() {
  const { loadUsers, users, addUser } = useUsers();
  const router = useRouter();

  const columnHelper = createColumnHelper<Users>();

  const columns = [
    // Display Column
    columnHelper.accessor("id", {
      cell: (props) => <span>{props.getValue()}</span>,
    }),
    columnHelper.accessor("first_name", {
      header: "First Name",
      cell: (props) => <span>{props.getValue()}</span>,
    }),
    columnHelper.accessor("last_name", {
      header: "Last Name",
      cell: (props) => <span>{props.getValue()}</span>,
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (props) => <span>{props.getValue()}</span>,
    }),
    {
      id: "expander",
      header: () => null,
      cell: (props) => (
        <Link href={`/edit/${props.row.original.id}`}>Edit</Link>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    loadUsers();
  }, []);

  if (users.length === 0) return <div>Loading...</div>;

  return (
    <>
      <h1>Condo Users</h1>

      <div className="usersTable">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} data-testid="user-info">
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default memo(IndexPage);

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { memo, useEffect } from "react";
import Link from "next/link";

import { useUsers } from "./hooks/useUsers/useUsers";
import { Users } from "./types/users";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

function IndexPage() {
  const { loadUsers, users, addUser, deleteUser } = useUsers();
  const router = useRouter();

  const columnHelper = createColumnHelper<Users>();

  const columns = [
    // Display Column
    columnHelper.accessor("id", {
      cell: (props) => (
        <Link
          style={{ display: "block", width: "100%" }}
          href={`/user/${props.row.original.id}`}
        >
          {props.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor("first_name", {
      header: "First Name",
      cell: (props) => (
        <Link
          style={{ display: "block", width: "100%" }}
          href={`/user/${props.row.original.id}`}
        >
          {props.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor("last_name", {
      header: "Last Name",
      cell: (props) => (
        <Link
          style={{ display: "block", width: "100%" }}
          href={`/user/${props.row.original.id}`}
        >
          {props.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (props) => (
        <Link
          style={{ display: "block", width: "100%" }}
          href={`/user/${props.row.original.id}`}
        >
          {props.getValue()}
        </Link>
      ),
    }),
    {
      id: "edit",
      header: () => null,
      cell: (props: CellContext<Users, string>) => (
        <Link
          style={{ display: "block", width: "100%" }}
          href={`/edit/${props.row.original.id}`}
        >
          EDIT
        </Link>
      ),
    },
    {
      id: "delete",
      header: () => null,
      cell: (props: CellContext<Users, string>) => (
        <Button
          data-testid="delete"
          onClick={() => {
            deleteUser(props.row.original.id);
          }}
        >
          Delete {props.row.original.id}
        </Button>
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
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              data-testid="user-info"
              onClick={() => {
                router.push(`user/${1}`);
              }}
            >
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {["edit"].includes(cell.id) ? (
                    <Button
                      key={cell.id}
                      style={{ width: "100%", padding: "none" }}
                      variant="outlined"
                      color="primary"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Button>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default memo(IndexPage);

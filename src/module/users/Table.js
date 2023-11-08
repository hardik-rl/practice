import React from "react";
import defaultData from "../../data.json";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";
import { Link } from "react-router-dom";

const Table = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <span>Id</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
      header: () => <span>First Name</span>,
      footer: (info) => info.column.id,
      meta: { type: "text" },
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: "lastName",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
      footer: (info) => info.column.id,
      meta: { type: "text" },
    }),
    columnHelper.accessor("age", {
      header: () => <span>Age</span>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("gender", {
      header: () => <span>Gender</span>,
      footer: (info) => info.column.id,
      cell: (info) => (
        <div>{info.row.original.gender === "M" ? "Male" : "Female"}</div>
      ),
      meta: {
        type: "select",
        filters: [
          { label: "All", value: "select" },
          { label: "Male", value: "M" },
          { label: "Female", value: "F" },
        ],
      },
    }),
    columnHelper.accessor("email", {
      header: () => <span>Email</span>,
      footer: (info) => info.column.id,
      meta: { type: "text" },
    }),
    columnHelper.accessor("singup", {
      header: () => <span>Singup</span>,
      footer: (info) => info.column.id,
      meta: {
        type: "select",
        filters: [
          { label: "All", value: "select" },
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    }),
  ];
  const table = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="container">
      <Link to={"/"}>&lt; Back</Link> <br />
      <br />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} table={table} />
                      </div>
                    ) : null}
                  </div>
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
      <Pagination table={table} />
    </div>
  );
};

export default Table;

import React from "react";
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
import { getUsersList } from "./api";
import { useQuery } from "react-query";
import Spinner from "../../components/Spinner";

const Table = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: () => getUsersList(),
  });
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <span>Id</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("firstName", {
      header: () => <span>First Name</span>,
      cell: (info) => <div>{info.row.original.name?.firstname}</div>,
      footer: (info) => info.column.name.firstname,
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: "lastName",
      cell: (info) => <div>{info.row.original.name?.lastname}</div>,
      header: () => <span>Last Name</span>,
      footer: (info) => info.column.name.lastName,
    }),
    columnHelper.accessor("email", {
      header: () => <span>Email</span>,
      footer: (info) => info.column.id,
      meta: { type: "text" },
    }),
    columnHelper.accessor("phone", {
      header: () => <span>Phone</span>,
      footer: (info) => info.column.phone,
    }),
    columnHelper.accessor("city", {
      cell: (info) => <div>{info.row.original.address?.city}</div>,
      header: () => <span>City</span>,
      footer: (info) => info.column.address.city,
    }),
    columnHelper.accessor("Address", {
      cell: (info) => <div>{info.row.original.address?.street}</div>,
      header: () => <span>address</span>,
      footer: (info) => info.column.address?.street,
    }),
  ];
  const table = useReactTable({
    data: response?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="px-3">
      <br />
      <Link to={"/"}>&lt; Back</Link> <br />
      <br />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination table={table} />
        </>
      )}
    </div>
  );
};

export default Table;

import React from "react";
import Spinner from "../../components/Spinner";
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
import { getProductList } from "./api";
import { useQuery } from "react-query";

const Table = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: () => getProductList(),
  });

  console.log(response?.data);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => <span>Id</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      header: () => <span>Title</span>,
      footer: (info) => info.column.title,
    }),
    columnHelper.accessor("description", {
      header: () => <span>Description</span>,
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("price", {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Price</span>,
      footer: (info) => info.column.price,
    }),
    // columnHelper.accessor("gender", {
    //   header: () => <span>Gender</span>,
    //   footer: (info) => info.column.id,
    //   cell: (info) => (
    //     <div>{info.row.original.gender === "M" ? "Male" : "Female"}</div>
    //   ),
    //   meta: {
    //     type: "select",
    //     filters: [
    //       { label: "All", value: "select" },
    //       { label: "Male", value: "M" },
    //       { label: "Female", value: "F" },
    //     ],
    //   },
    // }),
    columnHelper.accessor("rating", {
      header: () => <span>Rating</span>,
      cell: (info) => (
        <div>
          {info.row.original.rating.rate} out of &nbsp;
          {info.row.original.rating.count.toString().slice(0, -2)}
        </div>
      ),
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
    data: response?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
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
            {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
          </table>
          <Pagination table={table} />
        </>
      )}
    </>
  );
};

export default Table;

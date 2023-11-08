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
import { getProductList } from "./api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import ImgLoad from "./ImgLoad";

const Table = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: () => getProductList(),
  });

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
      footer: (info) => info.column.id,
      meta: { type: "text" },
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: () => <span>Description</span>,
      footer: (info) => info.column.id,
      meta: { type: "text" },
    }),
    columnHelper.accessor("price", {
      cell: (info) => info.getValue(),
      header: () => <span>Price</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
      header: () => <span>Category</span>,
      footer: (info) => info.column.id,
      meta: { type: "text" },
    }),
    columnHelper.accessor("rating", {
      header: () => <span>rating</span>,
      cell: (info) => {
        return (
          <div style={{ display: "flex", whiteSpace:"nowrap" }}>
            {info.row.original.rating.count}&nbsp; out of &nbsp;
            <span
              style={{
                color: info.row.original.rating.rate > 3 ? "green" : "red",
                fontWeight: 600,
              }}
            >
              {info.row.original.rating.rate}
            </span>
          </div>
        );
      },
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("image", {
      header: () => <span>Image</span>,
      cell: (info) => {
        return (
          <ImgLoad imgPath={info.row.original.image}/>
        );
      },
      footer: (info) => info.column.id,
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
          <Link to={"/"}>&lt; Back</Link>
          <br />
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
                            <Filter column={header.column} />
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
    </>
  );
};

export default Table;

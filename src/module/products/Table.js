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
    columnHelper.accessor("price", {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Price</span>,
      footer: (info) => info.column.id,
      meta: { type: "text" },
    }),
    columnHelper.accessor("rating", {
      header: () => <span>rating</span>,
      cell: (info) => {
        return (
          <div style={{ display: "flex" }}>
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
    columnHelper.accessor("image", {
      header: () => <span>Image</span>,
      cell: (info) => {
        return (
          <div>
            <img
              width={50}
              height={50}
              src={info.row.original.image}
              alt="test"
            />
          </div>
        );
      },
      footer: (info) => info.column.id,
    }),
    // columnHelper.accessor("singup", {
    //   header: () => <span>Singup</span>,
    //   footer: (info) => info.column.id,
    //   meta: {
    //     type: "select",
    //     filters: [
    //       { label: "All", value: "select" },
    //       { label: "Yes", value: "yes" },
    //       { label: "No", value: "no" },
    //     ],
    //   },
    // }),
  ];
  // {console.log(response.data)}
  // const [data, setData] = useState(() => [...response.data]);
  // const rerender = React.useReducer(() => ({}), {})[1];
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

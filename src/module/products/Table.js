import React, { useState } from "react";
import Spinner from "../../components/Spinner";
import { PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
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
import { Link } from "react-router-dom";
import ProductViewModal from "./ProductViewModal";
import ProductAddModal from "./ProductAddModal";

const Table = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: () => getProductList(),
  });

  const [viewProduct, setViewProduct] = useState(false);
  const [productData, setProductData] = useState("");
  const handleRowClick = (data) => {
    setProductData(data);
    setViewProduct(true);
  };

  const [addProduct, setAddProduct] = useState(false);
  const addProductOnClick = (e) => {
    e.stopPropagation();
    setAddProduct(true);
  };

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
      meta: { type: "text" },
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
    columnHelper.accessor("image", {
      cell: (info) => (
        <img
          src={info.row.original.image}
          alt="img"
          width={70}
          height={70}
          style={{ objectFit: "contain" }}
        />
      ),
      header: () => <span>image</span>,
    }),

    columnHelper.accessor("rating", {
      header: () => <span>Rating</span>,
      cell: (info) => (
        <div>
          {info.row.original.rating?.rate} out of &nbsp;
          <span
            style={{
              fontWeight: "600",
              color:
                info.row.original.rating?.count.toString().slice(0, -2) >= 3
                  ? "green"
                  : "red",
            }}
          >
            {info.row.original.rating?.count.toString().slice(0, -2)}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("actions", {
      header: () => <span>Actions</span>,
      cell: () => (
        <div className="actions">
          <button onClick={addProductOnClick}>
            <PlusIcon style={{ width: 18 }} />
          </button>
          <button>
            <PencilAltIcon style={{ width: 18 }} />
          </button>
          <button>
            <TrashIcon style={{ width: 18 }} />
          </button>
        </div>
      ),
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
      <Link to={"/"}>&lt; Back</Link>
      <br />
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
                <tr key={row.id} onClick={() => handleRowClick(row.original)}>
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
          <ProductViewModal
            viewProduct={viewProduct}
            setViewProduct={setViewProduct}
            productData={productData}
            setProductData={setProductData}
          />

          <ProductAddModal
            viewProduct={addProduct}
            onClose={() => setAddProduct(false)}
          />
        </>
      )}
    </div>
  );
};

export default Table;

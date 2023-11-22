import React, { useState } from "react";
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
import Modal from "../../components/Modal";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const Table = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: () => getProductList(),
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");

  const handleRowClick = (data) => {
    setModalData(data);
    setModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData("");
    document.body.classList.remove("modal-open");
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
          <span
            style={{
              fontWeight: "600",
              color:
                info.row.original.rating.count.toString().slice(0, -2) >= 3
                  ? "green"
                  : "red",
            }}
          >
            {info.row.original.rating.count.toString().slice(0, -2)}
          </span>
        </div>
      ),
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
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <>
              <h2>Products {modalData.id} Details</h2>
              <ul>
                <li>
                  <strong>Title :- </strong>
                  {modalData.title}
                </li>
                <li>
                  <strong>Description :- </strong>
                  {modalData.description}
                </li>
                <li>
                  <strong>Price :- </strong>
                  {modalData.price}
                </li>
                <li>
                  <strong>Category :- </strong>
                  {modalData.category}
                </li>
                <li>
                  <strong>Rating :- </strong>
                  {modalData.rating?.count} out of
                  <span
                    style={{
                      color: modalData.rating?.rate > 3 ? "green" : "red",
                      fontWeight: 600,
                    }}
                  >
                    {modalData.rating?.rate}
                  </span>
                </li>
                <li>
                  <strong>Image :- </strong>
                  <img width={50} height={50} src={modalData.image} alt="img" />
                </li>
              </ul>
            </>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Table;

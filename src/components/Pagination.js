import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({table}) => {
  return (
    <>
      <div className="flex items-center gap-2 mt-4 pagination">
        <ReactPaginate
          breakLabel="..."
          onPageChange={(event) => table.setPageIndex(event.selected)}
          marginPagesDisplayed={3}
          pageRangeDisplayed={0}
          pageCount={table.getPageCount()}
          renderOnZeroPageCount={null}
          activeClassName="is-active"
          previousLabel={
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
          }
          nextLabel={
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
          }
        />
      </div>
    </>
  )
}

export default Pagination
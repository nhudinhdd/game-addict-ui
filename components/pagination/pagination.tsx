import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

export interface PaginationListProps {
  currentPage: number;
  totalPage: number;
  setCurrentPage: (currentPage: number) => void;
}
export function PaginationList(props: PaginationListProps) {
  const { currentPage, totalPage, setCurrentPage } = props;
  console.log(totalPage);
  console.log(currentPage);

  const pageLength = 5;
  const [pageLayer, setPageLayer] = useState(
    Math.ceil((currentPage * 1.0) / pageLength)
  );
  const updateArrayPage = (start: number, end: number) => {
    var list = [];
    end = end > totalPage ? totalPage : end;
    for (var i = start; i <= end; i++) {
      list.push(i);
    }
    return list;
  };
  const [arrayPage, setArrayPage] = useState(
    updateArrayPage((pageLayer - 1) * 5 + 1, pageLayer * 5)
  );

  useEffect(() => {
    setArrayPage(updateArrayPage((pageLayer - 1) * 5 + 1, pageLayer * 5));
  }, [currentPage, totalPage]);

  return (
    <>
      {}
      <Pagination>
        <Pagination.First
          title="Tới trang đầu"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
        {arrayPage.map((page) => (
          <Pagination.Item
            key={page}
            onClick={() => setCurrentPage(page)}
            active={currentPage === page}
          >
            {page}
          </Pagination.Item>
        ))}
        {pageLayer * 5 < totalPage && (
          <Pagination.Ellipsis
            onClick={() => setCurrentPage(pageLayer * 5 + 1)}
          ></Pagination.Ellipsis>
        )}
        <Pagination.Next
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
        <Pagination.Last
          title="Tới trang cuối"
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage(totalPage)}
        />
      </Pagination>
    </>
  );
}

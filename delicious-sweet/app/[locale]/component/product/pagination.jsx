import { Pagination } from "react-bootstrap";
import "../../../../styles/pagesStyle/Blog/paginations.css"; 
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const DisplayPagination = ({ totalPages, currentPage, onPageChange }) => {
  const visiblePages = 3;
  const startPage = Math.max(1, Math.min(currentPage - 1, totalPages - (visiblePages - 1)));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  return (
    <Pagination className="d-flex align-items-center gap-2 justify-content-center">
      {currentPage > 1 && (
        <Pagination.Prev
          className="SMSSS"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <FaArrowLeft />
        </Pagination.Prev>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <Pagination.Item
          key={startPage + i}
          className={`SMSSS ${currentPage === startPage + i ? "ssf" : ""}`}
          onClick={() => onPageChange(startPage + i)}
        >
          {startPage + i}
        </Pagination.Item>
      ))}

      {currentPage < totalPages && (
        <Pagination.Next
          className="SMSSS"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <FaArrowRight />
        </Pagination.Next>
      )}
    </Pagination>
  );
};

export default DisplayPagination;

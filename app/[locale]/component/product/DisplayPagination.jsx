"use client";

import { Pagination } from "react-bootstrap";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import "../../../../styles/pagesStyle/Blog/paginations.css"

const DisplayPagination = ({ pagination, locale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const visiblePages = 3;

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Calculate visible page range
  let startPage = Math.max(1, pagination?.current_page - 1);
  let endPage = Math.min(pagination?.last_page || 1, startPage + visiblePages - 1);

  // Adjust if we're at the end
  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  return (
    <Pagination className="d-flex align-items-center gap-2 justify-content-center">
      {pagination?.current_page > 1 && (
        <Pagination.Prev
          className="SMSSS d-flex align-items-center justify-content-center"
          onClick={() => handlePageChange(pagination?.current_page - 1)}
        >
          {locale == "ar" ? (
            <FaArrowRight className="d-flex align-items-center justify-content-center" />
          ) : (
            <FaArrowLeft className="d-flex align-items-center justify-content-center" />
          )}
        </Pagination.Prev>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <Pagination.Item
          key={startPage + i}
          className={`SMSSS ${pagination?.current_page === startPage + i ? "ssf" : ""}`}
          onClick={() => handlePageChange(startPage + i)}
        >
          {startPage + i}
        </Pagination.Item>
      ))}

      {pagination?.current_page < pagination?.last_page && (
        <Pagination.Next
          className="SMSSS d-flex align-items-center justify-content-center"
          onClick={() => handlePageChange(pagination?.current_page + 1)}
        >
          {locale == "ar" ? (
            <FaArrowLeft className="d-flex align-items-center justify-content-center" />
          ) : (
            <FaArrowRight className="d-flex align-items-center justify-content-center" />
          )}
        </Pagination.Next>
      )}
    </Pagination>
  );
};

export default DisplayPagination;
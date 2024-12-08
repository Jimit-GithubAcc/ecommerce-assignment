import React from "react";
import styles from "./Pagination.module.css";
import { ITEMS_PER_PAGE_OPTIONS } from "../../utils/constants";
import CustomButton from "../button/CustomButton";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbersToDisplay = (currentPage: number, totalPages: number) => {
    const range: number[] = [];
    if (currentPage > 3) range.push(1, -1);
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      range.push(i);
    }
    if (currentPage < totalPages - 2) range.push(-1, totalPages);
    return range;
  };

  return (
    <section className={styles.pagination}>
      <div className={styles.pageButtons}>
        <CustomButton
          title="First"
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        />
        <CustomButton
          title="Previous"
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        />

        {pageNumbersToDisplay(currentPage, totalPages).map((page, idx) =>
          page === -1 ? (
            <span key={idx} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <CustomButton
              key={page}
              title={page.toString()}
              type="button"
              onClick={() => onPageChange(page)}
              className={`${styles.pageButton} ${
                currentPage === page ? styles.active : ""
              }`}
            />
          )
        )}

        <CustomButton
          title="Next"
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        />
        <CustomButton
          title="Last"
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        />
      </div>

      <div className={styles.pageControls}>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className={styles.select}
        >
          {ITEMS_PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option} items per page
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default Pagination;

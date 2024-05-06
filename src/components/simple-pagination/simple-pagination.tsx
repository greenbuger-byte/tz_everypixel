import React, { FC } from 'react';

import styles from './simple-pagination.module.css';

type SimplePaginationProps = {
  page: number;
  total: number;
  itemsPerPage: number;
  onChangePage: (page: number) => void;
};

const SimplePagination: FC<SimplePaginationProps> = (props) => {
  const { page, itemsPerPage, total, onChangePage } = props;
  const PAGES_ON_SCREEN = 3;
  const pages = Math.ceil(total / itemsPerPage);

  function generatePagination() {
    let pagination = [page];
    if (page - 1) pagination = [page - 1, ...pagination];
    if (page < pages) pagination = [...pagination, page + 1];
    if (page + 1 < pages && pagination.length < PAGES_ON_SCREEN)
      pagination = [...pagination, page + 2];
    if (page >= pages && page > 2) pagination = [page - 2, ...pagination];
    return pagination;
  }
  function prevNextPaginationHandler(direction: number) {
    if (direction > 0 && pages <= page) return;
    if (direction < 0 && page < 2) return;
    onChangePage(page + direction);
  }
  return (
    <>
      {pages && pages !== 1 ? (
        <div className={styles.pagination}>
          <div className={styles.pagination__wrapper}>
            <button
              onClick={() => prevNextPaginationHandler(-1)}
              className={`${styles.pagination__button} ${styles.pagination__button__arrow}`}
            >
              <i className="material-icons">arrow_back_ios</i>
            </button>
            {generatePagination().map((currentPage) => (
              <button
                key={currentPage}
                onClick={() => onChangePage(currentPage)}
                className={`${styles.pagination__button} ${currentPage === page && styles.pagination__button__selected}`}
              >
                {currentPage}
              </button>
            ))}
            <button
              className={`${styles.pagination__button} ${styles.pagination__button__arrow}`}
              onClick={() => prevNextPaginationHandler(1)}
            >
              <i className="material-icons">arrow_forward_ios</i>
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SimplePagination;

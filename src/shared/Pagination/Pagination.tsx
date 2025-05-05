import { FC } from 'react';

interface PaginationProps {
  setCurrentPage(newCurrentPage: number): void
  currentPage: number;
}

export const Pagination: FC<PaginationProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <div>
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Назад
      </button>
      <span>Страница: {currentPage}</span>
      <button onClick={() => setCurrentPage(currentPage + 1)}>
        Вперед
      </button>
    </div>
  );
};

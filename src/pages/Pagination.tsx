import React from 'react';
import { StyledPagesUl } from './styles/pagination.styles';

interface IProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pages: (number | string)[];
}
export const Pagination = ({ currentPage, setCurrentPage, pages }: IProps) => {
  const lastPage = pages[pages.length - 1] as number;
  return (
    <StyledPagesUl>
      <li>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          &#60;
        </button>
      </li>
      {pages &&
        pages.map((el) => (
          <li key={el}>
            {typeof el === 'number' ? (
              <button
                onClick={() => setCurrentPage(el)}
                className={
                  el === currentPage ? 'active pagenumber' : 'pagenumber'
                }
              >
                {el}
              </button>
            ) : (
              <span>...</span>
            )}
          </li>
        ))}
      <li>
        <button
          disabled={currentPage === lastPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          &#62;
        </button>
      </li>
    </StyledPagesUl>
  );
};

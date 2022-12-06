import { useMemo } from 'react';

interface IPorps {
  currentPage: number;
  pageSizeLimit: number;
  totalItems: number;
  siblingCount?: number;
}

const defineRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_el, index) => index + start);
};

export const usePagination = ({
  currentPage,
  pageSizeLimit,
  totalItems,
  siblingCount = 2,
}: IPorps): (string | number)[] => {
  const paginationRange = useMemo(() => {
    const totalPages = Math.ceil(totalItems / pageSizeLimit);
    const totalPageNumbers = siblingCount + 5;
    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPages]
    */
    if (totalPageNumbers >= totalPages) {
      return defineRange(1, totalPages);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;
    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = defineRange(1, leftItemCount);

      return [...leftRange, 'DOTS R', totalPages];
    }
    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = defineRange(
        totalPages - rightItemCount + 1,
        totalPages
      );
      return [firstPageIndex, 'DOTS L', ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = defineRange(leftSiblingIndex, rightSiblingIndex);
      return [
        firstPageIndex,
        'DOTS L',
        ...middleRange,
        'DOTS R',
        lastPageIndex,
      ];
    }

    return [];
  }, [totalItems, pageSizeLimit, currentPage, siblingCount]);

  return paginationRange;
};

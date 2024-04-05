import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/Pagination";

interface StockPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const StockPagination: React.FC<StockPaginationProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  const handlePrevious = () => {
    setPage(Math.max(page - 1, 1));
  };

  const handleNext = () => {
    setPage(Math.min(page + 1, totalPages));
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <PaginationItem key={i}>
        <PaginationLink onClick={() => setPage(i)} isActive={i === page}>
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>
        {pages}
        <PaginationItem>
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default StockPagination;

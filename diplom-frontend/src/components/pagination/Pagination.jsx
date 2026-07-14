import styled from "styled-components";

const PaginationContainer = ({
  className,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={className}>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((page) => page - 1)}
      >
        ←
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((page) => page + 1)}
      >
        →
      </button>
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 0;

  button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: #f3d7df;
    color: #5c3d42;
    cursor: pointer;
    font-size: 16px;
    transition: 0.2s;
  }

  button:hover:not(:disabled) {
    background: #ff7f96;
    color: #fff;
  }

  button.active {
    background: #ff5d7a;
    color: #fff;
  }

  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

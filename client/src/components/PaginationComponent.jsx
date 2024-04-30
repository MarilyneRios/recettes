
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ recipes, currentPage, setCurrentPage }) => {
  const recipesPerPage = 6;
     
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Pagination>
        {[...Array(Math.ceil(recipes.length / recipesPerPage)).keys()].map(
          (number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  )
}

export default PaginationComponent;

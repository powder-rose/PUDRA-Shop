import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../selectors";

const CatalogBlockContainer = ({ className }) => {
  const products = useSelector(selectProducts);
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ].filter(Boolean);

  return (
    <div className={className}>
      <h3>Каталог</h3>

      <Link className={!selectedCategory ? "active" : ""} to="/catalog">
        Все товары
      </Link>

      {categories.map((category) => (
        <Link
          key={category}
          className={selectedCategory === category ? "active" : ""}
          to={`/catalog?category=${encodeURIComponent(category)}`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export const CatalogBlock = styled(CatalogBlockContainer)`
  width: 290px;
  min-width: 290px;
  border-radius: 25px 0 0 25px;
  padding: 35px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
  h3 {
    margin: 0 0 15px;
    color: #522d2d;
    font-size: 30px;
    font-weight: 300;
  }
  a {
    color: #522d2d;
    text-decoration: none;
    font-size: 18px;
    transition: 0.25s;
  }
  a:hover {
    color: #ff6b8b;
    transform: translateX(8px);
  }
  .active {
    color: #ff6b8b;
    font-weight: 600;
  }
`;

import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductCardContainer = ({
  className,
  id,
  title,
  imageUrl,
  price,
  count,
}) => {
  return (
    <Link to={`/catalog/${id}`} className={className}>
      <img src={imageUrl} alt={title} />

      <h3>{title}</h3>

      <p>{price} ₽</p>

      <span>{count > 0 ? `В наличии: ${count}` : "Нет в наличии"}</span>
    </Link>
  );
};

export const ProductCard = styled(ProductCardContainer)`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 250px;
  padding: 20px;

  text-decoration: none;
  color: inherit;

  border-radius: 15px;
  background: white;

  transition: 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
  }

  h3 {
    margin: 0;
    font-size: 20px;
  }

  p {
    font-size: 18px;
    font-weight: bold;
    color: var(--brand-color);
  }

  span {
    color: rgba(153, 99, 99, 0.61);
  }
`;

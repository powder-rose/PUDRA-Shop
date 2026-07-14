import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProductAsync, setBag } from "../../actions";
import { selectProduct } from "../../selectors";
import { useBreadcrumbs } from "../../hooks";
import { AddToBagButton, Loader } from "../../components";
import { request } from "../../utilits/request.js";

const ProductContainer = ({ className }) => {
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const params = useParams();
  const breadcrumbs = useBreadcrumbs({ product, category: product?.category });
  const [loading, setLoading] = useState(true);
  const [inBag, setInBag] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      await dispatch(loadProductAsync(params.id));

      setLoading(false);
    };

    load();
  }, [dispatch, params.id]);

  useEffect(() => {
    if (!product?.id) return;

    const checkBag = async () => {
      const { error, data } = await request("/bag");

      if (error) {
        console.error(error);
        return;
      }

      const exists = (data.data || []).some(
        (item) => item.productId === product.id,
      );

      setInBag(exists);
    };

    checkBag();
  }, [product?.id]);

  if (loading || !product) {
    return <Loader />;
  }

  const { id, title, desc, imageUrl, count, price } = product;

  const handleAddToBag = async () => {
    const { error, data } = await request("/bag", "POST", {
      productId: id,
    });

    if (error) {
      console.error(error);
      return;
    }

    dispatch(setBag(data.data));

    setInBag(true);
  };

  return (
    <div className={className}>
      <nav className="breadcrumbs">
        <ol>
          {breadcrumbs.map((item, i) => (
            <li key={i}>
              {item.to ? (
                <Link to={item.to}>{item.title}</Link>
              ) : (
                <span>{item.title}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="content-wrapper">
        <img className="product-image" src={imageUrl} alt="product-image" />
        <div className="product-container">
          <div className="product-info-container">
            <h2 className="product-header">{title}</h2>
            <div className="product-desc">{desc}</div>
          </div>
          <div className="product-price-container">
            <div className="product-count">Количество: {count} шт.</div>
            <div className="product-price">{price} Р</div>
          </div>
          <AddToBagButton onClick={handleAddToBag} disabled={inBag}>
            {inBag ? "В корзине" : "В корзину"}
          </AddToBagButton>
        </div>
      </div>
    </div>
  );
};

export const Product = styled(ProductContainer)`
  display: flex;
  flex-wrap: nowrap;

  .content-wrapper {
    display: flex;
  }

  .product-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .product-price-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .product-info-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .product-image {
    width: 418px;
    height: 418px;
    margin: 60px;
  }

  .product-header {
    font-weight: normal;
    color: var(--choko-color);
    font-size: 32px;
  }

  .product-desc {
    font-size: 24px;
    color: var(--choko-color);
  }

  .product-count {
    color: #a67b7b;
    font-size: 20px;
  }

  .product-price {
    font-size: 24px;
    color: #522e2e;
  }

  .breadcrumbs {
    margin: 40px;
  }

  .breadcrumbs ol {
    display: flex;
    list-style: none;
  }

  .breadcrumbs li {
    display: flex;
  }

  .breadcrumbs li:not(:last-child)::after {
    content: ">";
    margin: 0 8px;
  }

  .breadcrumbs a {
    text-decoration: none;
    color: inherit;
  }
`;

import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBag } from "../../actions";
import { selectBag } from "../../selectors";
import { Link } from "react-router-dom";
import { Total } from "./components/Total.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { request } from "../../utilits/request.js";

const BagContainer = ({ className }) => {
  const bag = useSelector(selectBag) || [];
  const dispatch = useDispatch();
  const isAuth = sessionStorage.getItem("userData");

  useEffect(() => {
    if (!isAuth) {
      const bag = JSON.parse(localStorage.getItem("bag")) || [];
      dispatch(setBag(bag));
      return;
    }

    request("/bag").then(({ data }) => {
      dispatch(setBag(data.data || []));
    });
  }, []);

  const increase = (id, count) => {
    if (!isAuth) {
      const bag = JSON.parse(localStorage.getItem("bag")) || [];

      const updatedBag = bag.map((item) =>
        item.productId === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );

      localStorage.setItem("bag", JSON.stringify(updatedBag));
      dispatch(setBag(updatedBag));
      return;
    }

    request("/bag", "PATCH", {
      productId: id,
      count: count + 1,
    }).then(({ data }) => {
      dispatch(setBag(data.data));
    });
  };

  const decrease = (id, count) => {
    if (!isAuth) {
      const bag = JSON.parse(localStorage.getItem("bag")) || [];

      const item = bag.find((item) => item.productId === id);

      if (item.quantity <= 1) {
        const updatedBag = bag.filter((item) => item.productId !== id);

        localStorage.setItem("bag", JSON.stringify(updatedBag));
        dispatch(setBag(updatedBag));
        return;
      }

      const updatedBag = bag.map((item) =>
        item.productId === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      );

      localStorage.setItem("bag", JSON.stringify(updatedBag));
      dispatch(setBag(updatedBag));

      return;
    }

    if (count <= 1) {
      remove(id);
      return;
    }

    request("/bag", "PATCH", {
      productId: id,
      count: count - 1,
    }).then(({ error, data }) => {
      if (error) {
        console.error(error);
        return;
      }

      dispatch(setBag(data.data));
    });
  };

  const remove = (id) => {
    if (!isAuth) {
      const bag = JSON.parse(localStorage.getItem("bag")) || [];

      const updatedBag = bag.filter((item) => item.productId !== id);

      localStorage.setItem("bag", JSON.stringify(updatedBag));
      dispatch(setBag(updatedBag));
      return;
    }

    request(`/bag/${id}`, "DELETE").then(({ data }) => {
      dispatch(setBag(data.data || []));
    });
  };

  const total = bag.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div className={className}>
      <h2 className="bag-header">Корзина</h2>
      <div className="bag-content">
        <div className="bag-items">
          {bag.map((item) => (
            <div key={item.productId} className="bag-item">
              <Link to={`/catalog/${item.productId}`}>
                <img src={item.imageUrl} alt={item.title} />
              </Link>

              <div className="info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>

              <div className="quantity">
                <button onClick={() => decrease(item.productId, item.quantity)}>
                  <FontAwesomeIcon icon={faMinus} size="lg" color="#FF2D2DFF" />
                </button>

                <span>{item.quantity}</span>

                <button
                  disabled={item.quantity >= item.count}
                  onClick={() => increase(item.productId, item.quantity)}
                >
                  <FontAwesomeIcon icon={faPlus} size="lg" color="#FF2D2DFF" />
                </button>
              </div>

              <div className="price">{item.price} ₽</div>

              <button onClick={() => remove(item.productId)}>
                <FontAwesomeIcon icon={faXmark} color="#FF2D2DFF" />
              </button>
            </div>
          ))}
        </div>

        <Total total={total} />
      </div>
    </div>
  );
};

export const Bag = styled(BagContainer)`
  display: flex;
  flex-direction: column;
  margin: 70px;

  .bag-header {
    font-size: 26px;
    font-weight: normal;
    color: var(--choko-color);
  }

  .bag-content {
    display: flex;
    align-items: flex-start;
    gap: 60px;
  }

  .bag-items {
    flex: 1;
  }

  .bag-item {
    display: grid;
    grid-template-columns:
      100px /* фото */
      1fr /* название */
      120px /* количество */
      100px /* цена */
      30px; /* крестик */

    align-items: center;
    gap: 30px;
    padding: 35px 0;
  }

  .bag-item img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 8px;
    background: #f5f5f5;
  }

  .info {
    display: flex;
    flex-direction: column;
    color: var(--choko-color);
  }

  .info h3 {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--brand-color);
  }

  .info p {
    margin-top: 8px;
    color: #777;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .info h3 {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    padding-bottom: 8px;
  }

  .info p {
    margin-top: 8px;
    color: #777;
  }

  .bag-item > button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
  .quantity {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;

    padding-bottom: 8px;
  }

  .quantity button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .price {
    text-align: right;
    font-size: 24px;
  }

  .bag-item > button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .total {
    width: 260px;
    flex-shrink: 0;
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--brand-color);
    border-radius: 20px;
    padding: 20px;
    position: sticky;
    top: 120px;
  }

  .total h3 {
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 10px;
  }

  .total-amount {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .checkout-btn {
    width: 100%;
    padding: 12px;
    border-radius: 25px;
    border: 1px solid var(--brand-color);
    background: transparent;
    cursor: pointer;
    transition: 0.2s;
  }

  .checkout-btn:hover {
    background: var(--brand-color-hover);
    color: #fff;
  }
`;

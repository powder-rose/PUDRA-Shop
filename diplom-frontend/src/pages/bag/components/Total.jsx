import styled from "styled-components";

const TotalContainer = ({ className, total }) => {
  return (
    <div className="total">
      <div>
        <h3>ИТОГО</h3>
        <div className="total-amount">{total} ₽</div>
      </div>
      <button className="checkout-btn">ОФОРМИТЬ</button>
    </div>
  );
};

export const Total = styled(TotalContainer)`
  align-self: flex-end;
`;

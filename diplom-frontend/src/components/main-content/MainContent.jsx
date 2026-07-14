import styled from "styled-components";
import { Link } from "react-router-dom";

const MainContentContainer = ({ className }) => {
  return (
    <div className={className}>
      <div className="overlay">
        <h2>НОВАЯ КОЛЛЕКЦИЯ УХОДА ЗА КОЖЕЙ</h2>
        <p>Нежные ароматы и лёгкие текстуры для вашей красоты</p>
        <button>
          <Link to="/catalog" className="btn-link">
            КУПИТЬ
          </Link>
        </button>
      </div>
    </div>
  );
};

export const MainContent = styled(MainContentContainer)`
  position: relative;

  width: 100%;
  height: 85vh;
  min-height: 650px;
  background: url("/images/promo-image.jpg") center/cover no-repeat;

  .overlay {
    position: absolute;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 40%;

    display: flex;
    flex-direction: column;

    padding: 0 40px;

    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
  }

  h2 {
    margin: 0;
    color: #522d2d;
    font-size: 42px;
    font-weight: 300;
    text-transform: uppercase;
  }

  p {
    color: #522d2d;
  }

  button {
    margin-top: 20px;

    width: 170px;
    height: 55px;

    border: none;
    border-radius: 40px;

    background: #ff8f8f;
    color: white;

    font-size: 20px;
    text-transform: uppercase;

    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    background: #ff6e6e;
  }

  .btn-link {
    text-decoration: none;
    color: #fff;
  }
`;

import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = ({ className }) => {
  return (
    <div className={className}>
      <div className="spinner"></div>
      <span>Загрузка...</span>
    </div>
  );
};

export const Loader = styled(LoaderContainer)`
  width: 100%;
  min-height: 300px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 20px;

  .spinner {
    width: 55px;
    height: 55px;

    border: 5px solid #f8d7e2;
    border-top-color: #ff5a7c;
    border-radius: 50%;

    animation: ${spin} 0.8s linear infinite;
  }

  span {
    font-size: 18px;
    color: #6a4b4b;
    letter-spacing: 1px;
  }
`;

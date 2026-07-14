import styled from "styled-components";

const ContentContainer = ({ className, children, error }) =>
  error ? (
    <div className={className}>
      <h2>Ошибка</h2>
      <div>{error}</div>
    </div>
  ) : (
    children
  );

export const Content = styled(ContentContainer)``;

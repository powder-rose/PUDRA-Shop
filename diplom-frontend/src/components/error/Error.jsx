import styled from "styled-components";

const ErrorContainer = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const Error = styled(ErrorContainer)`
  width: 325px;
  margin: 25px 0;
  padding: 25px;
  background-color: #fcafaf;
  border-radius: 15px;
  text-align: center;
  color: var(--choko-color);
`;

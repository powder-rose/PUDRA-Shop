import styled from "styled-components";

const TableHeaderContainer = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const TableHeader = styled(TableHeaderContainer)`
  color: var(--choko-color);
  font-weight: bold;
`;

import styled from "styled-components";

const AddToBagButtonContainer = ({
  className,
  width,
  height,
  fontSize,
  children,
  ...props
}) => {
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export const AddToBagButton = styled(AddToBagButtonContainer)`
  background-color: #fff;
  border: 2px solid var(--brand-color);
  border-radius: 25px;
  color: var(--brand-color);
  width: ${({ width }) => width || "280px"};
  height: ${({ height }) => height || "67px"};
  font-size: ${({ fontSize }) => fontSize || "20px"};
  &:hover {
    cursor: pointer;
    background-color: var(--brand-color);
    color: #fff;
  }
    &:disabled {
        color: #fff;
        background: var(--brand-color);
    }
`;

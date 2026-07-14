import styled from "styled-components";

const FormButtonContainer = ({ className, children, ...props }) => (
  <button className={className} {...props}>
    {children}
  </button>
);

export const FormButton = styled(FormButtonContainer)`
  width: 313px;
  height: 40px;
  border-radius: 20px;
  color: var(--choko-color);
  background-color: #fedfdf;
  border: none;
  margin-top: 30px;
  align-self: center;

  &:hover {
    cursor: pointer;
    background-color: #ffd0d0;
  }

  &:disabled {
    background-color: #c0c0c0;
    cursor: default;
    color: #625757;

    &:disabled:hover {
      background-color: #c0c0c0;
    }
  }
`;

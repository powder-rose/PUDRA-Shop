import styled from "styled-components";
import { forwardRef } from "react";
const InputContainer = forwardRef(({ className, ...props }, ref) => {
  return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
  width: 313px;
  height: 32px;
  border: none;
  padding: 5px;
  border-bottom: solid 1px var(--brand-color);
  margin-bottom: 20px;
  color: var(--choko-color);
  font-size: 20px;
  &::placeholder {
    color: #acacac;
  }
`;
